import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProducts } from '../hooks/useProducts'
import { Camera, X, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

const Sell = () => {
  const { user } = useAuth()
  const { createProduct } = useProducts()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    images: []
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      toast.error('Please sign in to sell products')
      navigate('/login')
    }
  }, [user, navigate])

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books & Study Materials' },
    { value: 'fashion', label: 'Fashion & Clothing' },
    { value: 'furniture', label: 'Furniture & Home' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'vehicles', label: 'Vehicles & Transport' }
  ]

  const conditions = [
    { value: '', label: 'Select Condition' },
    { value: 'new', label: 'New' },
    { value: 'like_new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ]

  const locations = [
    'University of Nairobi',
    'Kenyatta University',
    'Moi University',
    'Egerton University',
    'Jomo Kenyatta University',
    'Maseno University',
    'Strathmore University',
    'United States International University',
    'Daystar University',
    'Mount Kenya University'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (formData.images.length + files.length > 5) {
      toast.error('Maximum 5 images allowed')
      return
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, e.target.result]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.condition) {
      newErrors.condition = 'Condition is required'
    }

    if (!formData.location) {
      newErrors.location = 'Location is required'
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        seller_id: user.id
      }

      const { error } = await createProduct(productData)
      
      if (!error) {
        toast.success('Product listed successfully!')
        navigate('/my-products')
      }
    } catch (error) {
      toast.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Sell Your Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {formData.images.length < 5 && (
                  <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Add Photo</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {errors.images && (
                <p className="text-sm text-red-600">{errors.images}</p>
              )}
              <p className="text-sm text-gray-500">
                Upload up to 5 images. First image will be the main photo.
              </p>
            </div>

            {/* Product Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                placeholder="e.g., MacBook Pro 13-inch 2020"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Category and Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`input-field ${errors.category ? 'border-red-500' : ''}`}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={`input-field ${errors.condition ? 'border-red-500' : ''}`}
                >
                  {conditions.map(cond => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
                )}
              </div>
            </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (KSH) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`input-field ${errors.price ? 'border-red-500' : ''}`}
                  placeholder="0"
                  min="0"
                  step="1"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`input-field ${errors.location ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className={`input-field ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Describe your product in detail. Include any defects, accessories included, reason for selling, etc."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>List Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Sell