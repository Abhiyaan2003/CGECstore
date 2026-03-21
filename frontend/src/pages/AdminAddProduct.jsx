import React, { useState } from 'react'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const DEPARTMENTS = ['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'Other']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

// Small image preview component
const ImagePicker = ({ label, id, file, onChange }) => (
    <div className="admin-img-picker">
        <label htmlFor={id} className="admin-img-picker-label">
            {file ? (
                <img src={URL.createObjectURL(file)} alt="preview" className="admin-img-preview" />
            ) : (
                <div className="admin-img-placeholder">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span>{label}</span>
                </div>
            )}
            <input id={id} type="file" accept="image/*" style={{ display: 'none' }} onChange={onChange} />
        </label>
        {file && (
            <button type="button" className="admin-img-clear" onClick={() => onChange({ target: { files: [null] } })}>✕</button>
        )}
    </div>
)

const AdminAddProduct = () => {
    const [form, setForm] = useState({
        name: '', description: '', price: '', category: 'Men',
        subCategory: 'T-Shirt', department: 'CSE',
        bestseller: false, discount: 0, sizes: []
    })
    const [images, setImages] = useState([null, null, null])
    const [loading, setLoading] = useState(false)

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const toggleSize = (size) => {
        setForm(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }))
    }

    const handleImage = (index, e) => {
        const file = e.target.files[0] || null
        setImages(prev => { const a = [...prev]; a[index] = file; return a })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.sizes.length === 0) return toast.error('Select at least one size')
        const hasImage = images.some(Boolean)
        if (!hasImage) return toast.error('Upload at least one product image')

        setLoading(true)
        try {
            const fd = new FormData()
            fd.append('name', form.name)
            fd.append('description', form.description)
            fd.append('price', form.price)
            fd.append('category', form.category)
            fd.append('subCategory', form.subCategory)
            fd.append('department', form.department)
            fd.append('bestseller', form.bestseller)
            fd.append('discount', form.discount)
            fd.append('sizes', JSON.stringify(form.sizes))
            if (images[0]) fd.append('image1', images[0])
            if (images[1]) fd.append('image2', images[1])
            if (images[2]) fd.append('image3', images[2])

            const res = await fetch(backendUrl + '/api/product/add', {
                method: 'POST',
                headers: { token: localStorage.getItem('adminToken') },
                body: fd
            })
            const data = await res.json()

            if (data.success) {
                toast.success('Product added successfully!')
                setForm({ name: '', description: '', price: '', category: 'Men', subCategory: 'T-Shirt', department: 'CSE', bestseller: false, discount: 0, sizes: [] })
                setImages([null, null, null])
            } else {
                toast.error(data.message || 'Failed to add product')
            }
        } catch (err) {
            toast.error('Error connecting to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-page">
            <h2 className="admin-page-title">Add New Product</h2>

            <form className="admin-form" onSubmit={handleSubmit}>

                {/* Images */}
                <div className="admin-field">
                    <label className="admin-label">Product Images * (up to 3)</label>
                    <div className="admin-img-row">
                        <ImagePicker label="Image 1" id="img1" file={images[0]} onChange={e => handleImage(0, e)} />
                        <ImagePicker label="Image 2" id="img2" file={images[1]} onChange={e => handleImage(1, e)} />
                        <ImagePicker label="Image 3" id="img3" file={images[2]} onChange={e => handleImage(2, e)} />
                    </div>
                </div>

                {/* Name */}
                <div className="admin-field">
                    <label className="admin-label">Product Name *</label>
                    <input id="prod-name" className="admin-input" type="text" placeholder="e.g. CSE Departmental T-shirt"
                        value={form.name} onChange={e => update('name', e.target.value)} required />
                </div>

                {/* Description */}
                <div className="admin-field">
                    <label className="admin-label">Description *</label>
                    <textarea id="prod-desc" className="admin-input admin-textarea" placeholder="Product description…"
                        value={form.description} onChange={e => update('description', e.target.value)} required rows={3} />
                </div>

                {/* Price & Discount */}
                <div className="admin-row">
                    <div className="admin-field" style={{ flex: 1 }}>
                        <label className="admin-label">Price (₹) *</label>
                        <input id="prod-price" className="admin-input" type="number" min="0" placeholder="499"
                            value={form.price} onChange={e => update('price', e.target.value)} required />
                    </div>
                    <div className="admin-field" style={{ flex: 1 }}>
                        <label className="admin-label">Discount (%)</label>
                        <input id="prod-discount" className="admin-input" type="number" min="0" max="100" placeholder="0"
                            value={form.discount} onChange={e => update('discount', e.target.value)} />
                    </div>
                </div>

                {/* Category / SubCategory / Department */}
                <div className="admin-row">
                    <div className="admin-field" style={{ flex: 1 }}>
                        <label className="admin-label">Category</label>
                        <select id="prod-category" className="admin-input admin-select" value={form.category} onChange={e => update('category', e.target.value)}>
                            <option>Men</option><option>Women</option><option>Kids</option>
                        </select>
                    </div>
                    <div className="admin-field" style={{ flex: 1 }}>
                        <label className="admin-label">Sub-Category</label>
                        <select id="prod-subcat" className="admin-input admin-select" value={form.subCategory} onChange={e => update('subCategory', e.target.value)}>
                            <option>T-Shirt</option><option>Hoodie</option><option>Shirt</option><option>Cap</option><option>Jacket</option>
                        </select>
                    </div>
                    <div className="admin-field" style={{ flex: 1 }}>
                        <label className="admin-label">Department</label>
                        <select id="prod-dept" className="admin-input admin-select" value={form.department} onChange={e => update('department', e.target.value)}>
                            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                {/* Sizes */}
                <div className="admin-field">
                    <label className="admin-label">Sizes *</label>
                    <div className="admin-size-grid">
                        {SIZES.map(size => (
                            <button key={size} type="button" id={`size-${size}`}
                                className={`admin-size-btn ${form.sizes.includes(size) ? 'admin-size-active' : ''}`}
                                onClick={() => toggleSize(size)}>{size}</button>
                        ))}
                    </div>
                </div>

                {/* Bestseller */}
                <div className="admin-field admin-row" style={{ alignItems: 'center', gap: '12px' }}>
                    <input id="prod-bestseller" type="checkbox" className="admin-checkbox"
                        checked={form.bestseller} onChange={e => update('bestseller', e.target.checked)} />
                    <label className="admin-label" style={{ marginBottom: 0 }} htmlFor="prod-bestseller">Mark as Bestseller</label>
                </div>

                <button id="add-product-btn" type="submit" className="admin-submit-btn" disabled={loading}>
                    {loading ? 'Uploading & Adding…' : '+ Add Product'}
                </button>
            </form>
        </div>
    )
}

export default AdminAddProduct
