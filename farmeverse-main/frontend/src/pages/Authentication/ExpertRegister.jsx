import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiAward, FiPhone, FiShield } from 'react-icons/fi'
import FormContainer from '../../components/common/FormContainer'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Toast from '../../components/common/Toast'

import { expertAPI } from '../../services/api' // Usually expertAPI or authAPI

export const ExpertRegister = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [step, setStep] = useState(1) // 1: Registration Form, 2: OTP Verification
    const [registeredMobile, setRegisteredMobile] = useState('')
    const [maskedEmail, setMaskedEmail] = useState('')

    const triggerToast = (msg, type = 'error') => setToast({ message: msg, type })

    const getErrorMessage = (err) => {
        if (!err.response) return 'Network error: Please check your connection'
        const errorData = err.response.data
        let errorMsg = errorData?.message || errorData?.errors?.non_field_errors?.[0] || errorData?.errors?.error
        if (!errorMsg && errorData?.errors) {
            const fields = Object.keys(errorData.errors)
            if (fields.length > 0) {
                const firstField = fields[0]
                const firstMsg = errorData.errors[firstField]
                errorMsg = `${firstField}: ${Array.isArray(firstMsg) ? firstMsg[0] : firstMsg}`
            }
        }
        return errorMsg || 'Registration failed. Please check inputs.'
    }

    // ── Step 1: Registration Form ──
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            fullName: '',
            mobile: '',
            email: '',
            specialization: '',
            password: '',
            confirmPassword: ''
        }
    })

    const password = watch('password')

    const onSubmit = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            // Using authAPI for registration since it might be a general endpoint, adjust if expertAPI has a specific register
            // Assuming authAPI handles role-based registration as per FarmerRegister
            import('../../services/api').then(async ({ authAPI }) => {
                const res = await authAPI.register({
                    full_name: data.fullName,
                    mobile: data.mobile,
                    email: data.email,
                    specialization: data.specialization,
                    password: data.password,
                    role: 'Expert'
                })
                
                if (res.success || res.status === 201) {
                    setRegisteredMobile(data.mobile)
                    setMaskedEmail(res.data?.masked_email || res.masked_email || 'your email')
                    triggerToast(res.message || 'Expert account created! Please verify OTP.', 'success')
                    setStep(2) // Move to OTP verification
                } else {
                    triggerToast(res.message || 'Registration failed', 'error')
                }
            }).catch(err => {
                console.error(err)
                triggerToast('API import error', 'error')
            })
            
        } catch (err) {
            console.error(err)
            triggerToast(getErrorMessage(err), 'error')
        } finally {
            setIsLoading(false)
        }
    }

    // ── Step 2: OTP Verification ──
    const {
        register: regOtp,
        handleSubmit: handleOtpSubmit,
        formState: { errors: errorsOtp }
    } = useForm({ defaultValues: { otp: '' } })

    const onOtpSubmit = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            import('../../services/api').then(async ({ authAPI }) => {
                const res = await authAPI.verifyRegistrationOtp(registeredMobile, data.otp)
                if (res.success) {
                    triggerToast(res.message || 'Email verified successfully! You can now login as Expert.', 'success')
                    setTimeout(() => navigate('/expert/login'), 2000)
                } else {
                    triggerToast(res.message || 'OTP verification failed', 'error')
                }
            })
        } catch (err) {
            console.error(err)
            triggerToast(getErrorMessage(err), 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOtp = async () => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            import('../../services/api').then(async ({ authAPI }) => {
                const res = await authAPI.resendRegistrationOtp(registeredMobile)
                if (res.success) {
                    triggerToast(res.message || 'New OTP has been sent to your email.', 'success')
                } else {
                    triggerToast(res.message || 'Failed to resend OTP', 'error')
                }
            })
        } catch (err) {
            console.error(err)
            triggerToast(getErrorMessage(err), 'error')
        } finally {
            setIsLoading(false)
        }
    }

    // ── Step 2: OTP Verification Screen ──
    if (step === 2) {
        return (
            <FormContainer
                title="Verify Expert Account"
                subtitle={`We have sent a 6-digit verification code to ${maskedEmail}.`}
                roleTheme="expert"
                backTo="/expert/register"
                backLabel="Back to Registration"
            >
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
                <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-4">
                    <Input
                        label="6-Digit OTP Code"
                        name="otp"
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 123456"
                        icon={FiShield}
                        required
                        error={errorsOtp.otp}
                        {...regOtp('otp', {
                            required: 'OTP is required',
                            pattern: {
                                value: /^\d{6}$/,
                                message: 'OTP must be exactly 6 digits'
                            }
                        })}
                    />
                    <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading} className="mt-2 bg-blue-600 hover:bg-blue-700">
                        Verify Expert OTP
                    </Button>
                    <div className="text-center">
                        <button
                            type="button"
                            className="text-xs text-blue-600 font-bold hover:underline"
                            disabled={isLoading}
                            onClick={handleResendOtp}
                        >
                            Resend OTP
                        </button>
                    </div>
                </form>
            </FormContainer>
        )
    }

    // ── Step 1: Registration Form ──
    return (
        <FormContainer
            title="Expert Registration"
            subtitle="Join AgriSmart as an Agricultural Expert"
            roleTheme="expert"
            backTo="/expert/login"
            backLabel="Back to Login"
        >
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    icon={FiUser}
                    required
                    error={errors.fullName}
                    {...register('fullName', { required: 'Full name is required' })}
                />

                <Input
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    icon={FiPhone}
                    required
                    error={errors.mobile}
                    {...register('mobile', { 
                        required: 'Mobile number is required',
                        pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Please enter a valid 10-digit mobile number'
                        }
                    })}
                />

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="expert@agrismart.ai"
                    icon={FiMail}
                    required
                    error={errors.email}
                    {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                        }
                    })}
                />
                
                <Input
                    label="Specialization"
                    name="specialization"
                    placeholder="e.g. Agronomy, Plant Pathology"
                    icon={FiAward}
                    required
                    error={errors.specialization}
                    {...register('specialization', { required: 'Specialization is required' })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Create password"
                        icon={FiLock}
                        required
                        error={errors.password}
                        {...register('password', {
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Must contain 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special symbol'
                            }
                        })}
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter password"
                        icon={FiLock}
                        required
                        error={errors.confirmPassword}
                        {...register('confirmPassword', {
                            required: 'Password confirmation is required',
                            validate: (val) => val === password || 'Passwords do not match'
                        })}
                    />
                </div>

                <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading} className="mt-2 bg-blue-600 hover:bg-blue-700">
                    Register as Expert
                </Button>

                <div className="text-center text-sm text-slate-500 pt-3 border-t border-slate-100">
                    <span>Already have an account? </span>
                    <Link to="/expert/login" className="text-blue-600 font-bold hover:underline">
                        Login Here
                    </Link>
                </div>
            </form>
        </FormContainer>
    )
}

export default ExpertRegister
