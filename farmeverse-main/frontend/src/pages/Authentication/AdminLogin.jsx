import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authAPI } from '../../services/api'
import FormContainer from '../../components/common/FormContainer'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Toast from '../../components/common/Toast'
import { FiUser, FiLock } from 'react-icons/fi'

export const AdminLogin = () => {
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
        let errorMsg = errorData?.message || errorData?.errors?.non_field_errors?.[0] || errorData?.errors?.error
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
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const res = await authAPI.login({
                credential: data.username,
                password: data.password,
                role: 'Admin'
            })
            if (res.success) {
                const { tokens, user } = res.data
                localStorage.setItem('access_token', tokens.access)
                localStorage.setItem('refresh_token', tokens.refresh)
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('role', user.role)
                navigate('/admin/dashboard')
            } else {
                triggerToast(res.message || 'Invalid administrator credentials', 'error')
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
            title="Administrator Control Center"
            subtitle="System Governance & Management Portal"
            roleTheme="admin"
            backTo="/"
        >
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username/ID field */}
                <Input
                    label="Username / Admin ID"
                    name="username"
                    placeholder="Enter administrator username"
                    icon={FiUser}
                    required
                    error={errors.username}
                    {...register('username', {
                        required: 'Username is required'
                    })}
                />

                {/* Password field */}
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter admin password"
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
                <Button type="submit" variant="dark" isLoading={isLoading} disabled={isLoading} className="mt-2 bg-slate-900 hover:bg-slate-950 border border-slate-800">
                    Secure Admin Login
                </Button>

                {/* Registration Link */}
                <div className="text-center text-sm text-slate-500 pt-3 border-t border-slate-100">
                    <span>Don't have an admin account? </span>
                    <Link to="/admin/register" className="text-purple-600 font-bold hover:underline">
                        Register Here
                    </Link>
                </div>
            </form>
        </FormContainer>
    )
}

export default AdminLogin
