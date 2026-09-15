import React, { useState, lazy, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Sprout,
  AlertCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { authAPI } from '../../services/api';

// Lazy-load the 3D tractor scene to maintain instant load performance
const TractorFarmCanvas = lazy(() => import('../3d/TractorFarmCanvas'));

// Gujarat 33 Districts for Farmer Profile
const GUJARAT_DISTRICTS = [
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar',
  'Botad', 'Chhota Udepur', 'Dahod', 'Devbhumi Dwarka', 'Gandhinagar', 'Gir Somnath',
  'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada',
  'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat',
  'Surendranagar', 'Tapi', 'The Dangs', 'Vadodara', 'Valsad'
];

export function AuthSwitch({
  defaultMode = 'login',
  className = '',
  onSuccess,
  redirectOnLogin = '/farmer/dashboard'
}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(defaultMode); // 'login' | 'signup'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStatus, setTransitionStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    mobile: '',
    password: '',
    rememberMe: true
  });

  // Signup Form State (Step 1: Details, Step 2: OTP Verification)
  const [signupStep, setSignupStep] = useState(1);
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    village: '',
    taluka: '',
    district: 'Ahmedabad',
    password: '',
    confirmPassword: '',
    acceptTerms: true
  });
  const [otp, setOtp] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');

  // ── Mode Switch Trigger with 3D Tractor Driving & Panel Slide ──
  const handleModeChange = (newMode) => {
    if (newMode === mode || isTransitioning) return;

    setIsTransitioning(true);
    setTransitionStatus(
      newMode === 'signup'
        ? '🚜 Tractor driving Left ➔ Right to Signup...'
        : '🚜 Tractor driving Right ➔ Left to Login...'
    );

    setMode(newMode);
    setErrorMsg('');
    setSuccessMsg('');
    if (newMode === 'login' && signupStep === 2) {
      setSignupStep(1);
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setTransitionStatus('');
  };

  // ── Handle Login Submit ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!/^[6-9]\d{9}$/.test(loginForm.mobile)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (!loginForm.password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.login({
        credential: loginForm.mobile,
        password: loginForm.password,
        role: 'Farmer'
      });

      if (res.success) {
        const { tokens, user } = res.data;
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role);

        setSuccessMsg('Welcome back! Logging you in...');
        if (onSuccess) onSuccess(user);
        setTimeout(() => {
          navigate(redirectOnLogin);
        }, 800);
      } else {
        setErrorMsg(res.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      const resp = err.response?.data;
      const msg = resp?.message || resp?.errors?.non_field_errors?.[0] || 'Login failed. Please check credentials.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Handle Signup Submit (Step 1) ──
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signupForm.fullName.trim()) {
      setErrorMsg('Full Name is required');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(signupForm.mobile)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!signupForm.email.includes('@')) {
      setErrorMsg('Please enter a valid email address for verification');
      return;
    }
    if (signupForm.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (!signupForm.acceptTerms) {
      setErrorMsg('Please accept the Terms & Conditions to register');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.register({
        full_name: signupForm.fullName,
        mobile: signupForm.mobile,
        email: signupForm.email,
        password: signupForm.password,
        role: 'Farmer'
      });

      if (res.success) {
        setMaskedEmail(res.data?.masked_email || signupForm.email);
        setSuccessMsg('Verification OTP sent! Check your inbox.');
        setSignupStep(2);
      } else {
        setErrorMsg(res.message || 'Registration failed. Please check your details.');
      }
    } catch (err) {
      const resp = err.response?.data;
      const msg = resp?.message || resp?.errors?.mobile?.[0] || resp?.errors?.email?.[0] || 'Registration failed. Mobile or email may already be registered.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Handle OTP Verification (Step 2) ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (otp.length < 4) {
      setErrorMsg('Please enter the OTP sent to your email');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.verifyRegistrationOtp(signupForm.mobile, otp);
      if (res.success) {
        setSuccessMsg('Account verified successfully! You can now log in.');
        setTimeout(() => {
          handleModeChange('login');
          setLoginForm((prev) => ({ ...prev, mobile: signupForm.mobile }));
          setSignupStep(1);
          setSuccessMsg('Account ready! Please enter your password to login.');
        }, 1500);
      } else {
        setErrorMsg(res.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Shared Switcher Tab component
  const renderSwitcher = (currentMode) => (
    <div className="mb-6">
      <div className="bg-slate-200/75 p-1.5 rounded-2xl flex relative select-none shadow-inner">
        <button
          type="button"
          onClick={() => handleModeChange('login')}
          disabled={isTransitioning}
          className={cn(
            'flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 cursor-pointer text-center',
            currentMode === 'login' ? 'text-white' : 'text-slate-600 hover:text-slate-900',
            isTransitioning && 'cursor-wait'
          )}
        >
          Farmer Login
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('signup')}
          disabled={isTransitioning}
          className={cn(
            'flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 cursor-pointer text-center',
            currentMode === 'signup' ? 'text-white' : 'text-slate-600 hover:text-slate-900',
            isTransitioning && 'cursor-wait'
          )}
        >
          Create Account
        </button>

        {/* Sliding Indicator Pill in brand green (#048B62) */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-xl bg-[#048B62] shadow-md shadow-[#048B62]/30"
          layout
          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          style={{
            left: currentMode === 'login' ? '6px' : '50%',
            right: currentMode === 'login' ? '50%' : '6px'
          }}
        />
      </div>
    </div>
  );

  // Alerts component
  const renderAlerts = () => (
    <>
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-semibold"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-800 text-xs font-semibold"
        >
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
          <span>{successMsg}</span>
        </motion.div>
      )}
    </>
  );

  // ── 3D Tractor Farm Stage Content ──
  const renderTractorStage = () => (
    <>
      {/* Top Branding */}
      <div className="relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner">
            <Sprout className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block leading-tight">
              AgriSmart <span className="text-emerald-200">AI</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-emerald-100/80">
              Precision Farmer Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Central 3D Interactive Tractor Farm Viewport */}
      <div className="relative z-10 my-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-emerald-950/40 backdrop-blur-sm group">
          <div className="w-full h-56 sm:h-64 relative">
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-900/60 text-emerald-100 gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-300" />
                  <span className="text-xs font-semibold">Loading 3D Farm World...</span>
                </div>
              }
            >
              <TractorFarmCanvas
                mode={mode}
                isTransitioning={isTransitioning}
                onTransitionComplete={handleTransitionComplete}
                className="w-full h-full"
              />
            </Suspense>
          </div>
        </div>

        {/* Dynamic Heading based on active mode */}
        <div className="mt-3">
          <h2 className="text-xl sm:text-2xl font-extrabold leading-tight text-white mb-2">
            {mode === 'login' ? 'Welcome Back, Farmer Friend!' : 'Empower Your Harvest with Real-Time AI'}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-3">
            {mode === 'login'
              ? 'Access live IoT soil telemetry, AI agronomist advisory, APMC market rate alerts, and smart irrigation schedules.'
              : 'Join thousands of farmers making data-driven decisions with ICAR-backed AI crop advisory and weather forecasts.'}
          </p>

          <div className="space-y-1.5 text-xs text-emerald-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
              <span>Real-time IoT Telemetry & Agronomy Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
              <span>Live APMC Mandi Price Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
              <span>Free AI Agronomist Voice Assistant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Badge */}
      <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100/80">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-300" /> 100% Secure & Govt MSP Synced
        </span>
        <Link to="/" className="hover:text-white transition-colors underline font-medium">
          Home
        </Link>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        'w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/10 bg-white min-h-[690px] relative',
        className
      )}
    >
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP SLIDING OVERLAY PANEL: GREEN HERO + 3D TRACTOR STAGE
          Login: sits on LEFT (left: 0%)
          Signup: slides to RIGHT (left: 54%)
          Tractor drives Left-to-Right (Login -> Signup)
          Tractor drives Right-to-Left (Signup -> Login)
      ────────────────────────────────────────────────────────────── */}
      <motion.div
        className="hidden lg:flex absolute top-0 bottom-0 z-30 w-[46%] bg-[#048B62] text-white p-6 sm:p-8 flex-col justify-between overflow-hidden shadow-2xl rounded-3xl"
        initial={false}
        animate={{
          left: mode === 'login' ? '0%' : '54%',
        }}
        transition={{
          duration: 1.8,
          ease: [0.65, 0, 0.35, 1], // Custom smooth easeInOut cubic matching tractor drive
        }}
      >
        {renderTractorStage()}
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP LEFT SIDE: CREATE ACCOUNT (SIGNUP) FORM CONTAINER
          Revealed on the LEFT when the green box slides to the RIGHT!
      ────────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          'hidden lg:flex absolute top-0 bottom-0 left-0 w-[54%] p-8 sm:p-10 flex-col justify-center bg-slate-50/60 overflow-y-auto transition-opacity duration-700',
          mode === 'signup' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
        )}
      >
        <div className="max-w-md w-full mx-auto">
          {renderSwitcher('signup')}
          {renderAlerts()}

          {signupStep === 1 ? (
            /* ── SIGNUP FORM STEP 1 ── */
            <form onSubmit={handleSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm placeholder:text-slate-400 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={signupForm.mobile}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })
                      }
                      placeholder="10-digit number"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm placeholder:text-slate-400 font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      placeholder="For OTP verification"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm placeholder:text-slate-400 font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Village
                  </label>
                  <input
                    type="text"
                    value={signupForm.village}
                    onChange={(e) => setSignupForm({ ...signupForm, village: e.target.value })}
                    placeholder="Village"
                    className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Taluka
                  </label>
                  <input
                    type="text"
                    value={signupForm.taluka}
                    onChange={(e) => setSignupForm({ ...signupForm, taluka: e.target.value })}
                    placeholder="Taluka"
                    className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    District
                  </label>
                  <select
                    value={signupForm.district}
                    onChange={(e) => setSignupForm({ ...signupForm, district: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm"
                  >
                    {GUJARAT_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    placeholder="Min 8 chars"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm font-medium"
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 pt-1 select-none">
                <input
                  type="checkbox"
                  checked={signupForm.acceptTerms}
                  onChange={(e) => setSignupForm({ ...signupForm, acceptTerms: e.target.checked })}
                  className="w-4 h-4 rounded text-[#048B62] focus:ring-[#048B62] border-slate-300 mt-0.5"
                  required
                />
                <span>
                  I agree to the <span className="text-[#048B62] font-semibold">Terms & Privacy</span> of AgriSmart AI
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading || isTransitioning}
                className="w-full mt-2 py-3 px-4 bg-[#048B62] hover:bg-[#037351] text-white font-bold rounded-xl shadow-lg shadow-[#048B62]/25 hover:shadow-xl hover:shadow-[#048B62]/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Verification OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Continue & Verify OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200/70">
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => handleModeChange('login')}
                  className="text-[#048B62] font-bold hover:underline cursor-pointer"
                >
                  Log In Here
                </button>
              </div>
            </form>
          ) : (
            /* ── SIGNUP FORM STEP 2: OTP VERIFICATION ── */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#048B62] flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">Verify Your Email</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter the 6-digit code sent to <br />
                  <span className="font-bold text-slate-700">{maskedEmail}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 text-center">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="• • • • • •"
                  className="w-full text-center tracking-[0.5em] text-lg font-black py-3 rounded-xl bg-white border-2 border-emerald-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length < 4}
                className="w-full py-3.5 px-4 bg-[#048B62] hover:bg-[#037351] text-white font-bold rounded-xl shadow-lg shadow-[#048B62]/25 hover:shadow-xl hover:shadow-[#048B62]/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Complete Registration</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setSignupStep(1)}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Details
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSuccessMsg('New OTP resent to your email!');
                  }}
                  className="text-[#048B62] font-bold hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP RIGHT SIDE: FARMER LOGIN FORM CONTAINER
          Revealed on the RIGHT when the green box is on the LEFT!
      ────────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          'hidden lg:flex absolute top-0 bottom-0 right-0 w-[54%] p-8 sm:p-10 flex-col justify-center bg-slate-50/60 overflow-y-auto transition-opacity duration-700',
          mode === 'login' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
        )}
      >
        <div className="max-w-md w-full mx-auto">
          {renderSwitcher('login')}
          {renderAlerts()}

          {/* ── LOGIN FORM ── */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={loginForm.mobile}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })
                  }
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm placeholder:text-slate-400 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#048B62]/30 focus:border-[#048B62] transition-all shadow-sm placeholder:text-slate-400 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={loginForm.rememberMe}
                  onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded text-[#048B62] focus:ring-[#048B62] border-slate-300"
                />
                <span>Remember Me</span>
              </label>

              <Link
                to="/farmer/forgot-password"
                className="text-[#048B62] font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || isTransitioning}
              className="w-full mt-2 py-3.5 px-4 bg-[#048B62] hover:bg-[#037351] text-white font-bold rounded-xl shadow-lg shadow-[#048B62]/25 hover:shadow-xl hover:shadow-[#048B62]/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-200/70">
              <span>New to AgriSmart? </span>
              <button
                type="button"
                onClick={() => handleModeChange('signup')}
                className="text-[#048B62] font-bold hover:underline cursor-pointer"
              >
                Create a free Farmer Account
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE / TABLET STACKED LAYOUT (< lg screen size)
      ────────────────────────────────────────────────────────────── */}
      <div className="flex lg:hidden flex-col w-full">
        {/* Top Green Hero with 3D Tractor Canvas */}
        <div className="bg-[#048B62] text-white p-6 flex flex-col justify-between">
          {renderTractorStage()}
        </div>

        {/* Form Container Below */}
        <div className="p-6 sm:p-8 bg-slate-50/70">
          <div className="max-w-md w-full mx-auto">
            {renderSwitcher(mode)}
            {renderAlerts()}

            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.form
                  key="mob-login"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={loginForm.mobile}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })
                        }
                        placeholder="e.g. 9876543210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                      <input
                        type="checkbox"
                        checked={loginForm.rememberMe}
                        onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                        className="w-4 h-4 rounded text-[#048B62]"
                      />
                      <span>Remember Me</span>
                    </label>

                    <Link to="/farmer/forgot-password" className="text-[#048B62] font-bold hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || isTransitioning}
                    className="w-full py-3.5 px-4 bg-[#048B62] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Login to Dashboard</span>}
                  </button>
                </motion.form>
              ) : signupStep === 1 ? (
                <motion.form
                  key="mob-signup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSignup}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Mobile *
                      </label>
                      <input
                        type="tel"
                        value={signupForm.mobile}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })
                        }
                        placeholder="10 digits"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={signupForm.village}
                      onChange={(e) => setSignupForm({ ...signupForm, village: e.target.value })}
                      placeholder="Village"
                      className="w-full px-2 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      value={signupForm.taluka}
                      onChange={(e) => setSignupForm({ ...signupForm, taluka: e.target.value })}
                      placeholder="Taluka"
                      className="w-full px-2 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                    <select
                      value={signupForm.district}
                      onChange={(e) => setSignupForm({ ...signupForm, district: e.target.value })}
                      className="w-full px-1.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    >
                      {GUJARAT_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      placeholder="Password"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm"
                      required
                    />
                    <input
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      placeholder="Confirm"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || isTransitioning}
                    className="w-full py-3 px-4 bg-[#048B62] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Continue & Verify OTP</span>}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="mob-otp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-4 text-center"
                >
                  <p className="text-xs text-slate-500">OTP sent to {maskedEmail}</p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="• • • • • •"
                    className="w-full text-center tracking-[0.5em] text-lg font-black py-3 rounded-xl bg-white border-2 border-emerald-300"
                    maxLength={6}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading || otp.length < 4}
                    className="w-full py-3.5 bg-[#048B62] text-white font-bold rounded-xl shadow-lg"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Verify & Complete</span>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Named alias Component matching template spec
export const Component = AuthSwitch;

export default AuthSwitch;
