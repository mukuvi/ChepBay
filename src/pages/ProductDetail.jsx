import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useChat } from '../hooks/useChat'
import { mockProducts } from '../lib/mockData'
import { 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  User, 
  MessageCircle, 
  ShoppingCart,
  ArrowLeft,
  Star,
  Shield,
  Truck
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { createConversation } = useChat()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      navigate('/search')
    }
  }, [id, navigate])

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

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

  const handleContactSeller = async () => {
    if (!user) {
      toast.error('Please sign in to contact the seller')
      navigate('/login')
      return
    }

    const conversationId = await createConversation(product.id, product.seller_id)
    if (conversationId) {
      navigate('/messages')
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to add items to cart')
      navigate('/login')
      return
    }
    addToCart(product)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const toggleFavorite = () => {
    if (!user) {
      toast.error('Please sign in to save favorites')
      navigate('/login')
      return
    }
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-primary-600' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full ${
                      isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    } hover:bg-red-100 hover:text-red-600 transition-colors`}
                  >
                    <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getConditionColor(product.condition)}`}>
                  {formatCondition(product.condition)}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleContactSeller}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Seller</span>
              </button>
              
              <button
                onClick={handleAddToCart}
                className="w-full btn-outline flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4">
                {product.profiles?.avatar_url ? (
                  <img
                    src={product.profiles.avatar_url}
                    alt={product.profiles.full_name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.profiles?.full_name}</h4>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>4.8 (24 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Safety */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Trust & Safety</span>
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span>Meet in public places for exchanges</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span>Inspect items before payment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span>Report suspicious activity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Delivery & Pickup</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Pickup Options</h4>
                <ul className="space-y-1">
                  <li>• Campus pickup available</li>
                  <li>• Meet at public locations</li>
                  <li>• Flexible timing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Delivery Options</h4>
                <ul className="space-y-1">
                  <li>• Local delivery (additional cost)</li>
                  <li>• Courier services available</li>
                  <li>• Secure packaging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail