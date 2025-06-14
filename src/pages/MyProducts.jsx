import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProducts } from '../hooks/useProducts'
import { mockProducts } from '../lib/mockData'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  MoreVertical,
  Package,
  TrendingUp,
  DollarSign,
  Clock
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

const MyProducts = () => {
  const { user } = useAuth()
  const { updateProduct, deleteProduct } = useProducts()
  const [myProducts, setMyProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    if (user) {
      // Filter products by current user
      const userProducts = mockProducts.filter(product => product.seller_id === user.id)
      setMyProducts(userProducts)
      setLoading(false)
    }
  }, [user])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleToggleAvailability = async (productId, currentStatus) => {
    const { error } = await updateProduct(productId, { is_available: !currentStatus })
    if (!error) {
      setMyProducts(prev => 
        prev.map(product => 
          product.id === productId 
            ? { ...product, is_available: !currentStatus }
            : product
        )
      )
    }
    setActiveDropdown(null)
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await deleteProduct(productId)
      if (!error) {
        setMyProducts(prev => prev.filter(product => product.id !== productId))
      }
    }
    setActiveDropdown(null)
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800'
      case 'like_new':
        return 'bg-blue-100 text-blue-800'
      case 'good':
        return 'bg-yellow-100 text-yellow-800'
      case 'fair':
        return 'bg-orange-100 text-orange-800'
      case 'poor':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCondition = (condition) => {
    return condition.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to view your products.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600">Manage your listed products</p>
          </div>
          <Link
            to="/sell"
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>List New Product</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{myProducts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myProducts.filter(p => p.is_available).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(myProducts.reduce((sum, p) => sum + p.price, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Days Listed</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : myProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.is_available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.is_available ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Condition Badge */}
                  <div className="absolute top-2 right-12">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(product.condition)}`}>
                      {formatCondition(product.condition)}
                    </span>
                  </div>

                  {/* Actions Dropdown */}
                  <div className="absolute top-2 right-2">
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>

                      {activeDropdown === product.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <Link
                            to={`/product/${product.id}`}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Eye className="h-4 w-4" />
                            <span>View Product</span>
                          </Link>
                          
                          <button
                            onClick={() => handleToggleAvailability(product.id, product.is_available)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            {product.is_available ? (
                              <>
                                <EyeOff className="h-4 w-4" />
                                <span>Mark as Sold</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4" />
                                <span>Mark as Available</span>
                              </>
                            )}
                          </button>
                          
                          <button
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Edit2 className="h-4 w-4" />
                            <span>Edit Product</span>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete Product</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-2xl font-bold text-primary-600 mb-2">
                    {formatPrice(product.price)}
                  </p>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{product.location}</span>
                    <span>{formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products listed yet</h3>
            <p className="text-gray-600 mb-4">
              Start selling by listing your first product
            </p>
            <Link
              to="/sell"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>List Your First Product</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProducts