import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const STATUS_OPTIONS = [
    'Order Placed',
    'Packing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
]

const STATUS_COLORS = {
    'Order Placed': '#6366f1',
    'Packing': '#f59e0b',
    'Shipped': '#3b82f6',
    'Out for Delivery': '#f97316',
    'Delivered': '#22c55e',
}

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(null)

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await fetch(backendUrl + '/api/order/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('adminToken'),
                },
                body: JSON.stringify({}),
            })
            const data = await res.json()
            if (data.success) {
                setOrders([...data.orders].reverse())
            } else {
                toast.error(data.message || 'Failed to load orders')
            }
        } catch {
            toast.error('Error connecting to server')
        } finally {
            setLoading(false)
        }
    }

    // Send status and/or expectedDelivery update
    const sendUpdate = async (orderId, status, expectedDelivery) => {
        setUpdating(orderId)
        try {
            const res = await fetch(backendUrl + '/api/order/status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('adminToken'),
                },
                body: JSON.stringify({ orderId, status, expectedDelivery }),
            })
            const data = await res.json()
            if (data.success) {
                setOrders(prev =>
                    prev.map(o =>
                        o._id === orderId
                            ? { ...o, status, expectedDelivery: expectedDelivery ?? o.expectedDelivery }
                            : o
                    )
                )
                toast.success('Order updated')
            } else {
                toast.error(data.message || 'Update failed')
            }
        } catch {
            toast.error('Error connecting to server')
        } finally {
            setUpdating(null)
        }
    }

    const handleStatusChange = (order, newStatus) => {
        sendUpdate(order._id, newStatus, order.expectedDelivery)
    }

    const handleDeliveryDate = (order, newDate) => {
        // optimistic local update
        setOrders(prev => prev.map(o => o._id === order._id ? { ...o, expectedDelivery: newDate } : o))
    }

    const handleDeliveryDateBlur = (order) => {
        sendUpdate(order._id, order.status, order.expectedDelivery)
    }

    useEffect(() => { fetchOrders() }, [])

    if (loading) return (
        <div className="admin-page">
            <h2 className="admin-page-title">All Orders</h2>
            <div className="admin-loading">Loading orders…</div>
        </div>
    )

    return (
        <div className="admin-page">
            <div className="admin-list-header">
                <h2 className="admin-page-title" style={{ margin: 0 }}>All Orders</h2>
                <span className="admin-count-badge">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
                <button
                    className="admin-edit-img-btn"
                    style={{ marginLeft: 'auto' }}
                    onClick={fetchOrders}
                >
                    ↻ Refresh
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="admin-empty"><p>No orders yet.</p></div>
            ) : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Date</th>
                                <th>Est. Delivery</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => (
                                <tr key={order._id}>
                                    <td style={{ color: '#9ca3af', fontSize: 12 }}>{orders.length - idx}</td>

                                    <td>
                                        <p className="admin-prod-name">
                                            {order.address?.firstName} {order.address?.lastName}
                                        </p>
                                        <p className="admin-prod-sub">{order.address?.city}, {order.address?.state}</p>
                                        <p className="admin-prod-sub">{order.address?.phone}</p>
                                    </td>

                                    <td>
                                        {order.items.map((item, i) => (
                                            <p key={i} className="admin-prod-sub">
                                                {item._id} × {item.quantity}
                                                <span style={{ marginLeft: 6, fontWeight: 600 }}>({item.size})</span>
                                            </p>
                                        ))}
                                    </td>

                                    <td><span className="admin-price">₹{order.amount}</span></td>

                                    <td><span className="admin-dept-badge">{order.paymentMethod}</span></td>

                                    <td style={{ fontSize: 12, color: '#6b7280' }}>
                                        {new Date(order.date).toLocaleDateString('en-IN', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })}
                                    </td>

                                    {/* ── Expected Delivery date picker ── */}
                                    <td>
                                        <input
                                            type="date"
                                            value={order.expectedDelivery || ''}
                                            disabled={updating === order._id}
                                            onChange={e => handleDeliveryDate(order, e.target.value)}
                                            onBlur={() => handleDeliveryDateBlur(order)}
                                            style={{
                                                border: '1px solid #d1d5db',
                                                borderRadius: 6,
                                                padding: '4px 8px',
                                                fontSize: 12,
                                                color: '#374151',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                opacity: updating === order._id ? 0.5 : 1,
                                            }}
                                        />
                                        {order.expectedDelivery && (
                                            <p style={{ fontSize: 11, color: '#10b981', marginTop: 3, fontWeight: 600 }}>
                                                {new Date(order.expectedDelivery + 'T00:00:00').toLocaleDateString('en-IN', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </p>
                                        )}
                                    </td>

                                    {/* ── Status dropdown ── */}
                                    <td>
                                        <select
                                            value={order.status}
                                            disabled={updating === order._id}
                                            onChange={e => handleStatusChange(order, e.target.value)}
                                            style={{
                                                background: STATUS_COLORS[order.status] || '#6b7280',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '5px 10px',
                                                fontSize: 12,
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                outline: 'none',
                                                opacity: updating === order._id ? 0.6 : 1,
                                            }}
                                        >
                                            {STATUS_OPTIONS.map(s => (
                                                <option key={s} value={s} style={{ background: '#1f2937', color: '#fff' }}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminOrders
