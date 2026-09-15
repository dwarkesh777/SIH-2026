import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FiPhone, FiLock, FiShield } from 'react-icons/fi'
import FormContainer from '../../components/common/FormContainer'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Toast from '../../components/common/Toast'

import { authAPI } from '../../services/api'

export const ForgotPasswordFlow = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) // 1: Mobile, 2: OTP, 3: Reset
    const [isLoading, setIsLoading] = useState(false)
    const [userMobile, setUserMobile] = useState('')
    const [resetToken, setResetToken] = useState('')
    const [toast, setToast] = useState(null)
    const triggerToast = (msg, type = 'error') => setToast({ message: msg, type })

    const getErrorMessage = (err) => {
        if (!err.response) return 'Network error: Please check your connection'
        if (err.response.status === 401) return 'Unauthorized: Please check credentials'
        if (err.response.status === 404) return 'No data found'
        if (err.response.status >= 500) return 'Server error: Please try again later'

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
        return errorMsg || 'Operation failed. Please try again.'
    }

    // Form hooks for Step 1 (Mobile)
    const {
        register: regMobile,
        handleSubmit: handleMobileSubmit,
        formState: { errors: errorsMobile }
    } = useForm({ defaultValues: { mobile: '' } })

    // Form hooks for Step 2 (OTP)
    const {
        register: regOtp,
        handleSubmit: handleOtpSubmit,
        formState: { errors: errorsOtp }
    } = useForm({ defaultValues: { otp: '' } })

    // Form hooks for Step 3 (Reset Password)
    const {
        register: regReset,
        handleSubmit: handleResetSubmit,
        watch: watchReset,
        formState: { errors: errorsReset }
    } = useForm({ defaultValues: { password: '', confirmPassword: '' } })

    const password = watchReset('password')

    // Step 1: Mobile Form submission
    const onMobileSubmit = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const res = await authAPI.forgotPassword(data.mobile)
            if (res.success) {
                setUserMobile(data.mobile)
                triggerToast(res.message || 'OTP has been sent to your email!', 'success')
                setStep(2) // Move to OTP
            } else {
                triggerToast(res.message || 'Mobile verification failed', 'error')
            }
        } catch (err) {
            console.error(err)
            triggerToast(getErrorMessage(err), 'error')
        } finally {
            setIsLoading(false)
        }
    }

    // Step 2: OTP Form submission
    const onOtpSubmit = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const res = await authAPI.verifyOtp(userMobile, data.otp)
            if (res.success) {
                setResetToken(res.data?.reset_token || '')
                triggerToast(res.message || 'OTP verified successfully!', 'success')
                setStep(3) // Move to Reset Password
            } else {
                triggerToast(res.message || 'Invalid OTP code', 'error')
            }
        } catch (err) {
            console.error(err)
            triggerToast(getErrorMessage(err), 'error')
        } finally {
            setIsLoading(false)
        }
    }

    // Step 3: Password Reset submission
    const onResetSubmit = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const res = await authAPI.resetPassword(userMobile, data.password, data.confirmPassword, resetToken)
            if (res.success) {
                triggerToast(res.message || 'Password reset successfully! Please login.', 'success')
                setTimeout(() => navigate('/farmer/login'), 2000)
            } else {
                triggerToast(res.message || 'Password reset failed', 'error')
            }
        } catch (err) {
            console.error(err)
            triggerToast(getErrorMessage(err), 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <FormContainer
            title={
                step === 1
                    ? 'Password Recovery'
                    : step === 2
                        ? 'OTP Verification'
                        : 'Set New Password'
            }
            subtitle={
                step === 1
                    ? 'Enter your registered mobile number to receive an OTP'
                    : step === 2
                        ? 'We have sent a 6-digit OTP code to your registered email.'
                        : 'Please enter and confirm your new secure password below'
            }
            roleTheme="farmer"
            backTo="/farmer/login"
            backLabel="Back to Login"
        >
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* STEP 1: Enter Mobile */}
            {step === 1 && (
                <form onSubmit={handleMobileSubmit(onMobileSubmit)} className="space-y-4">
                    <Input
                        label="Mobile Number"
                        name="mobile"
                        type="tel"
                        placeholder="Enter your 10-digit mobile number"
                        icon={FiPhone}
                        required
                        error={errorsMobile.mobile}
                        {...regMobile('mobile', {
                            required: 'Mobile number is required',
                            pattern: {
                                value: /^[6-9]\d{9}$/,
                                message: 'Please enter a valid 10-digit mobile number'
                            }
                        })}
                    />
                    <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
                        Send OTP
                    </Button>
                </form>
            )}

            {/* STEP 2: Enter OTP */}
            {step === 2 && (
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
                    <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
                        Verify OTP
                    </Button>
                    <div className="text-center">
                        <button
                            type="button"
                            className="text-xs text-primary font-bold hover:underline"
                            disabled={isLoading}
                            onClick={async () => {
                                try {
                                    const res = await authAPI.forgotPassword(userMobile)
                                    if (res.success) {
                                        triggerToast(res.message || 'New OTP has been sent!', 'success')
                                    } else {
                                        triggerToast(res.message || 'Failed to resend OTP', 'error')
                                    }
                                } catch (err) {
                                    triggerToast(getErrorMessage(err), 'error')
                                }
                            }}
                        >
                            Resend OTP
                        </button>
                    </div>
                </form>
            )}

            {/* STEP 3: Enter New Password */}
            {step === 3 && (
                <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-4">
                    <Input
                        label="New Password"
                        name="password"
                        type="password"
                        placeholder="Enter new password"
                        icon={FiLock}
                        required
                        error={errorsReset.password}
                        {...regReset('password', {
                            required: 'New password is required',
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special symbol'
                            }
                        })}
                    />
                    <Input
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter new password"
                        icon={FiLock}
                        required
                        error={errorsReset.confirmPassword}
                        {...regReset('confirmPassword', {
                            required: 'Password confirmation is required',
                            validate: (val) => val === password || 'Passwords do not match'
                        })}
                    />
                    <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
                        Reset Password
                    </Button>
                </form>
            )}
        </FormContainer>
    )
}

export default ForgotPasswordFlow
