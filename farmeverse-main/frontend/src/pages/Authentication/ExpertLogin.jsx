import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import FormContainer from '../../components/common/FormContainer'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Toast from '../../components/common/Toast'

import { expertAPI } from '../../services/api'

export const ExpertLogin = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const triggerToast = (msg, type = 'error') => setToast({ message: msg, type })

    const getErrorMessage = (err) => {
        if (!err.response) return 'Network error: Please check your connection'
        if (err.response.status === 401) return 'Unauthorized: Please check credentials'
        if (err.response.status === 404) return 'No data found'
        if (err.response.status >= 500) return 'Server error: Please try again later'

        const errorData = err.response.data
        let errorMsg = errorData?.error || errorData?.message
        if (!errorMsg && errorData?.errors) {
            const fields = Object.keys(errorData.errors)
            if (fields.length > 0) {
                const firstField = fields[0]
                const firstMsg = errorData.errors[firstField]
                errorMsg = `${firstField}: ${Array.isArray(firstMsg) ? firstMsg[0] : firstMsg}`
            }
        }
        return errorMsg || 'Login failed. Please check credentials.'
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const res = await expertAPI.login({
                email: data.email,
                password: data.password
            })
            const { tokens, user } = res
            localStorage.setItem('access_token', tokens.access)
            localStorage.setItem('refresh_token', tokens.refresh)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('role', 'Expert')
            navigate('/expert/dashboard')
        } catch (err) {
            console.error(err)
            triggerToast(getErrorMessage(err), 'error')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <FormContainer
            title="Agricultural Expert Login"
            subtitle="Expert Consultation and Advisory Portal"
            roleTheme="expert"
            backTo="/"
        >
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email/Username field */}
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

                {/* Password field */}
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    icon={FiLock}
                    required
                    error={errors.password}
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special symbol'
                        }
                    })}
                />

                {/* Submit */}
                <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading} className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                    Login to Expert Dashboard
                </Button>

                {/* Registration Link */}
                <div className="text-center text-sm text-slate-500 pt-3 border-t border-slate-100">
                    <span>Don't have an expert account? </span>
                    <Link to="/expert/register" className="text-blue-600 font-bold hover:underline">
                        Register Here
                    </Link>
                </div>
            </form>
        </FormContainer>
    )
}

export default ExpertLogin
