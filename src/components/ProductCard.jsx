import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { Heart, MapPin, Clock, ShoppingCart } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)
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

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  if (viewMode === 'list') {
    return (
      <div className="card hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <Link to={`/product/${product.id}`} className="flex-shrink-0">
            <div className="w-48 h-32 bg-gray-200 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
          </Link>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-2xl font-bold text-primary-600 mb-2">
                  {formatPrice(product.price)}
                </p>

                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{product.location || 'Campus'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2 ml-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(product.condition)}`}>
                  {formatCondition(product.condition)}
                </span>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card card-hover group">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-t-lg overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
        </Link>
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="h-4 w-4 text-gray-600 hover:text-primary-600" />
          </button>
        </div>

        {/* Condition Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(product.condition)}`}>
            {formatCondition(product.condition)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-2xl font-bold text-primary-600 mb-2">
          {formatPrice(product.price)}
        </p>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{product.location || 'Campus'}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}</span>
          </div>
        </div>

        {/* Seller Info */}
        {product.profiles && (
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
            {product.profiles.avatar_url ? (
              <img
                src={product.profiles.avatar_url}
                alt={product.profiles.full_name}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <div className="h-6 w-6 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {product.profiles.full_name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-600">{product.profiles.full_name}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard