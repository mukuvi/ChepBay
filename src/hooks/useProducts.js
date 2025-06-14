import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { mockProducts } from '../lib/mockData'

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filteredProducts = [...mockProducts]

      // Apply filters
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category)
      }
      
      if (filters.condition) {
        filteredProducts = filteredProducts.filter(p => p.condition === filters.condition)
      }
      
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice)
      }
      
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice)
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredProducts = filteredProducts.filter(p => 
          p.title.toLowerCase().includes(searchTerm) || 
          p.description.toLowerCase().includes(searchTerm)
        )
      }

      setProducts(filteredProducts)
      setError(null)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [JSON.stringify(filters)])

  const createProduct = async (productData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        is_available: true,
        profiles: {
          full_name: 'Current User',
          avatar_url: null
        }
      }

      setProducts(prev => [newProduct, ...prev])
      toast.success('Product listed successfully!')
      return { data: newProduct, error: null }
    } catch (err) {
      toast.error('Failed to create product')
      return { data: null, error: err }
    }
  }

  const updateProduct = async (id, updates) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, ...updates } : p
      ))
      
      toast.success('Product updated successfully!')
      return { data: updates, error: null }
    } catch (err) {
      toast.error('Failed to update product')
      return { data: null, error: err }
    }
  }

  const deleteProduct = async (id) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success('Product deleted successfully!')
      return { error: null }
    } catch (err) {
      toast.error('Failed to delete product')
      return { error: err }
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}