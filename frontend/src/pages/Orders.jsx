import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

// ── Status config ─────────────────────────────────────────────────────────────
const STAGES = [
  { key: 'Order Placed', icon: '📦', label: 'Order Placed' },
  { key: 'Packing', icon: '📫', label: 'Packing' },
  { key: 'Shipped', icon: '🚚', label: 'Shipped' },
  { key: 'Out for Delivery', icon: '🛵', label: 'Out for Delivery' },
  { key: 'Delivered', icon: '✅', label: 'Delivered' },
]

const STATUS_COLORS = {
  'Order Placed': '#6366f1',
  'Packing': '#f59e0b',
  'Shipped': '#3b82f6',
  'Out for Delivery': '#f97316',
  'Delivered': '#22c55e',
}

const STAGE_INDEX = Object.fromEntries(STAGES.map((s, i) => [s.key, i]))

// Estimate expected delivery: order date + 7 days (fallback only)
const estimateDelivery = (orderDate) => {
  const d = new Date(orderDate)
  d.setDate(d.getDate() + 7)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
}

const formatExpectedDelivery = (expectedDelivery, orderDate) => {
  if (expectedDelivery) {
    // Parse the YYYY-MM-DD string from admin without timezone shift
    const [y, m, d] = expectedDelivery.split('-').map(Number)
    return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  }
  return estimateDelivery(orderDate) + ' (estimated)'
}

const formatTs = (ts) =>
  new Date(ts).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  })

// ── Timeline Modal ─────────────────────────────────────────────────────────────
const TrackOrderModal = ({ order, productData, onClose }) => {
  const currentIdx = STAGE_INDEX[order.status] ?? 0
  const statusUpdates = order.statusUpdates || {}

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          width: '100%',
          maxWidth: 480,
          boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          fontFamily: 'inherit',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {productData?.image?.[0] && (
              <img src={productData.image[0]} alt=""
                style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }} />
            )}
            <div>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: 0 }}>
                {productData?.name || 'Order'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: '2px 0 0' }}>
                Size: {order.size} &nbsp;·&nbsp; Qty: {order.quantity}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, color: '#fff', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Expected delivery – only shown when admin has set a date or delivered */}
        {(order.expectedDelivery || order.status === 'Delivered') && (
          <div style={{
            background: '#f0fdf4', borderBottom: '1px solid #dcfce7',
            padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>📅</span>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: '#16a34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Expected Delivery
              </p>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#15803d' }}>
                {order.status === 'Delivered'
                  ? 'Delivered! 🎉'
                  : formatExpectedDelivery(order.expectedDelivery, order.orderDate)
                }
              </p>
            </div>
            <span style={{
              marginLeft: 'auto',
              background: STATUS_COLORS[order.status] || '#6b7280',
              color: '#fff', fontSize: 11, fontWeight: 700,
              padding: '3px 10px', borderRadius: 20,
            }}>
              {order.status}
            </span>
          </div>
        )}

        {/* Timeline */}
        <div style={{ padding: '24px 24px 28px' }}>
          <p style={{ margin: '0 0 20px', fontWeight: 700, fontSize: 14, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Order Timeline
          </p>

          <div style={{ position: 'relative' }}>
            {STAGES.map((stage, i) => {
              const done = i <= currentIdx
              const active = i === currentIdx
              const ts = statusUpdates[stage.key]

              return (
                <div key={stage.key} style={{ display: 'flex', gap: 16, position: 'relative' }}>

                  {/* Connector line */}
                  {i < STAGES.length - 1 && (
                    <div style={{
                      position: 'absolute', left: 18, top: 38,
                      width: 2, height: 48,
                      background: i < currentIdx
                        ? `linear-gradient(${STATUS_COLORS[stage.key]}, ${STATUS_COLORS[STAGES[i + 1].key]})`
                        : '#e5e7eb',
                      zIndex: 0,
                    }} />
                  )}

                  {/* Icon circle */}
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: done ? STATUS_COLORS[stage.key] : '#f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: done ? 16 : 14,
                    boxShadow: active ? `0 0 0 4px ${STATUS_COLORS[stage.key]}30` : 'none',
                    border: done ? 'none' : '2px solid #e5e7eb',
                    transition: 'all 0.2s',
                    zIndex: 1, position: 'relative',
                  }}>
                    {done ? stage.icon : <span style={{ color: '#d1d5db', fontSize: 12 }}>○</span>}
                  </div>

                  {/* Label + timestamp */}
                  <div style={{ paddingBottom: i < STAGES.length - 1 ? 32 : 0, flex: 1 }}>
                    <p style={{
                      margin: '8px 0 2px',
                      fontWeight: active ? 700 : done ? 600 : 400,
                      fontSize: 14,
                      color: done ? '#111827' : '#9ca3af',
                    }}>
                      {stage.label}
                      {active && (
                        <span style={{
                          marginLeft: 8, fontSize: 10, fontWeight: 700,
                          background: STATUS_COLORS[stage.key],
                          color: '#fff', padding: '1px 7px', borderRadius: 10,
                          verticalAlign: 'middle',
                        }}>CURRENT</span>
                      )}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: ts ? '#6b7280' : '#d1d5db' }}>
                      {ts ? formatTs(ts) : done ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #f3f4f6', padding: '14px 24px',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button onClick={onClose} style={{
            background: '#111827', color: '#fff', border: 'none',
            borderRadius: 8, padding: '9px 24px', fontSize: 13,
            fontWeight: 600, cursor: 'pointer',
          }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Orders Page ────────────────────────────────────────────────────────────────
const Orders = () => {
  const { products, currency, orders, loadUserOrders, token, navigate } = useContext(ShopContext)
  const [trackOrder, setTrackOrder] = useState(null) // { order, productData }

  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      loadUserOrders()
    }
  }, [token])

  // Flatten: each backend order has an `items` array; show one row per item
  const orderRows = []
  orders.forEach(order => {
    order.items.forEach(item => {
      const productData = products.find(p => p._id === item._id)
      orderRows.push({
        ...item,
        productData,
        status: order.status,
        orderDate: order.date,
        statusUpdates: order.statusUpdates || {},
        expectedDelivery: order.expectedDelivery || '',
        date: new Date(order.date).toDateString(),
        paymentMethod: order.paymentMethod,
        amount: order.amount,
        orderId: order._id,
      })
    })
  })

  const statusColor = (status) => STATUS_COLORS[status] || '#6b7280'

  return (
    <div className='border-t pt-16'>
      {/* Timeline modal */}
      {trackOrder && (
        <TrackOrderModal
          order={trackOrder}
          productData={trackOrder.productData}
          onClose={() => setTrackOrder(null)}
        />
      )}

      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />
      </div>

      {orderRows.length === 0 ? (
        <div className='flex flex-col items-center justify-center min-h-[40vh] text-gray-500'>
          <p className='text-lg'>No orders placed yet.</p>
        </div>
      ) : (
        <div>
          {orderRows.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start text-sm gap-4'>
                {item.productData
                  ? <img src={item.productData.image[0]} alt="product" className='w-16 sm:w-20 object-cover rounded' />
                  : <div className='w-16 sm:w-20 h-16 bg-gray-100 rounded' />
                }
                <div>
                  <p className='sm:text-base font-medium'>{item.productData?.name || 'Product'}</p>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.productData ? item.productData.price * item.quantity : '—'}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2 text-sm'>Date: <span className='text-gray-400'>{item.date}</span></p>
                  <p className='mt-1 text-sm'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mt-4 md:mt-0'>
                <div className='flex items-center gap-2'>
                  <span style={{ background: statusColor(item.status) }}
                    className='w-2 h-2 rounded-full inline-block'></span>
                  <p className='text-sm md:text-base font-medium'>{item.status}</p>
                </div>
                <button
                  className='border px-4 py-2 text-sm font-medium rounded-sm self-start md:self-auto hover:bg-black hover:text-white transition-colors'
                  onClick={() => setTrackOrder(item)}
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
