import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(backendUrl + '/api/user/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (data.success) {
                localStorage.setItem('adminToken', data.token)
                toast.success('Welcome, Admin!')
                navigate('/admin/add')
            } else {
                toast.error(data.message || 'Invalid credentials')
            }
        } catch (err) {
            toast.error('Server error. Is the backend running?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-bg">
            <form className="admin-login-card" onSubmit={onSubmit}>
                {/* Logo / branding */}
                <div className="admin-login-header">
                    <div className="admin-logo-badge">CW</div>
                    <h1 className="admin-login-title">CGEC Merchandise</h1>
                    <p className="admin-login-sub">Admin Portal</p>
                </div>

                <div className="admin-field">
                    <label className="admin-label">Email</label>
                    <input
                        id="admin-email"
                        type="email"
                        className="admin-input"
                        placeholder="admin@cgecwearables.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="admin-field">
                    <label className="admin-label">Password</label>
                    <input
                        id="admin-password"
                        type="password"
                        className="admin-input"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button
                    id="admin-login-btn"
                    type="submit"
                    className="admin-login-btn"
                    disabled={loading}
                >
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>

                <p className="admin-back-link">
                    <a href="/">← Back to Store</a>
                </p>
            </form>
        </div>
    )
}

export default AdminLogin
