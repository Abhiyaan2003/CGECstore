import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

// ── Edit Images Modal ────────────────────────────────────────────────────────
const EditImagesModal = ({ product, onClose, onSaved }) => {
    const [images, setImages] = useState([null, null, null])
    const [previews, setPreviews] = useState(product.image || [])
    const [loading, setLoading] = useState(false)

    const handleFile = (index, e) => {
        const file = e.target.files[0] || null
        setImages(prev => { const a = [...prev]; a[index] = file; return a })
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviews(prev => { const a = [...prev]; a[index] = url; return a })
        }
    }

    const handleSave = async () => {
        const hasNew = images.some(Boolean)
        if (!hasNew) return toast.error('Select at least one new image to upload')
        setLoading(true)
        try {
            const fd = new FormData()
            fd.append('productId', product._id)
            if (images[0]) fd.append('image1', images[0])
            if (images[1]) fd.append('image2', images[1])
            if (images[2]) fd.append('image3', images[2])

            const res = await fetch(backendUrl + '/api/product/update-images', {
                method: 'PUT',
                headers: { token: localStorage.getItem('adminToken') },
                body: fd
            })
            const data = await res.json()
            if (data.success) {
                toast.success('Images updated!')
                onSaved(product._id, data.images)
                onClose()
            } else {
                toast.error(data.message || 'Failed to update')
            }
        } catch {
            toast.error('Error connecting to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
                <div className="admin-modal-header">
                    <h3 className="admin-modal-title">Edit Images</h3>
                    <button className="admin-modal-close" onClick={onClose}>✕</button>
                </div>
                <p className="admin-modal-sub">{product.name}</p>

                <div className="admin-img-row" style={{ margin: '20px 0' }}>
                    {[0, 1, 2].map(i => (
                        <label key={i} htmlFor={`edit-img-${i}`} className="admin-img-picker-label" style={{ cursor: 'pointer' }}>
                            <div className="admin-img-picker">
                                {previews[i] ? (
                                    <img src={previews[i]} alt={`img${i + 1}`} className="admin-img-preview"
                                        onError={e => { e.target.style.display = 'none' }} />
                                ) : (
                                    <div className="admin-img-placeholder">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="3" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                        <span>Slot {i + 1}</span>
                                    </div>
                                )}
                            </div>
                            {images[i] && <p className="admin-img-filename">{images[i].name}</p>}
                            <input id={`edit-img-${i}`} type="file" accept="image/*" style={{ display: 'none' }}
                                onChange={e => handleFile(i, e)} />
                        </label>
                    ))}
                </div>

                <p className="admin-modal-hint">
                    Only slots with a newly selected file will be uploaded. Existing images in unchanged slots are replaced entirely with the new set.
                </p>

                <div className="admin-modal-actions">
                    <button className="admin-modal-cancel" onClick={onClose}>Cancel</button>
                    <button className="admin-submit-btn" onClick={handleSave} disabled={loading}>
                        {loading ? 'Uploading…' : 'Save Images'}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Main List Page ───────────────────────────────────────────────────────────
const AdminListProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [editProduct, setEditProduct] = useState(null)

    const fetchProducts = async () => {
        try {
            const res = await fetch(backendUrl + '/api/product/list')
            const data = await res.json()
            if (data.success) setProducts(data.products)
            else toast.error('Failed to load products')
        } catch {
            toast.error('Error connecting to server')
        } finally {
            setLoading(false)
        }
    }

    const removeProduct = async (id) => {
        if (!window.confirm('Remove this product?')) return
        try {
            const res = await fetch(backendUrl + '/api/product/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem('adminToken') },
                body: JSON.stringify({ id })
            })
            const data = await res.json()
            if (data.success) { toast.success('Product removed'); fetchProducts() }
            else toast.error(data.message || 'Failed to remove')
        } catch {
            toast.error('Error connecting to server')
        }
    }

    const handleImagesSaved = (productId, newImages) => {
        setProducts(prev => prev.map(p => p._id === productId ? { ...p, image: newImages } : p))
    }

    useEffect(() => { fetchProducts() }, [])

    if (loading) return (
        <div className="admin-page">
            <h2 className="admin-page-title">All Products</h2>
            <div className="admin-loading">Loading products…</div>
        </div>
    )

    return (
        <div className="admin-page">
            {editProduct && (
                <EditImagesModal
                    product={editProduct}
                    onClose={() => setEditProduct(null)}
                    onSaved={handleImagesSaved}
                />
            )}

            <div className="admin-list-header">
                <h2 className="admin-page-title" style={{ margin: 0 }}>All Products</h2>
                <span className="admin-count-badge">{products.length} item{products.length !== 1 ? 's' : ''}</span>
            </div>

            {products.length === 0 ? (
                <div className="admin-empty">
                    <p>No products in the database.</p>
                    <a href="/admin/add" className="admin-empty-link">Add your first product →</a>
                </div>
            ) : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Images</th>
                                <th>Name</th>
                                <th>Dept</th>
                                <th>Price</th>
                                <th>Sizes</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="admin-prod-imgs">
                                            {(product.image || []).slice(0, 2).map((img, i) => (
                                                <img key={i} src={img} alt="" className="admin-prod-img"
                                                    onError={e => { e.target.style.display = 'none' }} />
                                            ))}
                                            {(!product.image || product.image.length === 0) && (
                                                <div className="admin-prod-img-placeholder">No img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <p className="admin-prod-name">{product.name}</p>
                                        <p className="admin-prod-sub">{product.category} · {product.subCategory}</p>
                                    </td>
                                    <td><span className="admin-dept-badge">{product.department}</span></td>
                                    <td>
                                        <span className="admin-price">₹{product.price}</span>
                                        {product.discount > 0 && <span className="admin-discount">-{product.discount}%</span>}
                                    </td>
                                    <td>
                                        <div className="admin-sizes-list">
                                            {(product.sizes || []).map(s => <span key={s} className="admin-size-tag">{s}</span>)}
                                        </div>
                                    </td>
                                    <td>
                                        {product.bestseller
                                            ? <span className="admin-badge-best">Bestseller</span>
                                            : <span className="admin-badge-regular">Regular</span>}
                                    </td>
                                    <td>
                                        <div className="admin-actions-col">
                                            <button id={`edit-img-${product._id}`} className="admin-edit-img-btn"
                                                onClick={() => setEditProduct(product)}>
                                                Edit Images
                                            </button>
                                            <button id={`remove-${product._id}`} className="admin-remove-btn"
                                                onClick={() => removeProduct(product._id)}>
                                                Remove
                                            </button>
                                        </div>
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

export default AdminListProducts
