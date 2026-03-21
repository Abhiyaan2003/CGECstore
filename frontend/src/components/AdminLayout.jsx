import React, { useEffect } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const AdminLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('adminToken')) {
            navigate('/admin')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        toast.info('Logged out')
        navigate('/admin')
    }

    return (
        <div className="admin-shell">
            {/* Top Navbar */}
            <header className="admin-topbar">
                <div className="admin-topbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={assets.new_logo} className='h-8' alt="logo" />
                    <span className="admin-topbar-title" style={{ fontSize: '1rem' }}>Admin</span>
                </div>
                <button className="admin-logout-btn" onClick={handleLogout} id="admin-logout-btn">
                    Logout
                </button>
            </header>

            <div className="admin-body">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <nav className="admin-nav">
                        <NavLink
                            to="/admin/add"
                            id="nav-add-product"
                            className={({ isActive }) => `admin-nav-link${isActive ? ' admin-nav-active' : ''}`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                            Add Product
                        </NavLink>
                        <NavLink
                            to="/admin/list"
                            id="nav-list-products"
                            className={({ isActive }) => `admin-nav-link${isActive ? ' admin-nav-active' : ''}`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                            </svg>
                            Products
                        </NavLink>
                        <NavLink
                            to="/admin/orders"
                            id="nav-orders"
                            className={({ isActive }) => `admin-nav-link${isActive ? ' admin-nav-active' : ''}`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                                <rect x="9" y="3" width="6" height="4" rx="1" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="9" y1="16" x2="13" y2="16" />
                            </svg>
                            Orders
                        </NavLink>
                    </nav>
                </aside>

                {/* Page content */}
                <main className="admin-main">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
