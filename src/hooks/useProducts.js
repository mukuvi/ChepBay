import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('products')
        .select(`
          *,
          profiles:seller_id (
            full_name,
            avatar_url
          )
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category)
      }
      
      if (filters.condition) {
        query = query.eq('condition', filters.condition)
      }
      
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice)
      }
      
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) throw error

      setProducts(data || [])
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
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single()

      if (error) throw error

      toast.success('Product listed successfully!')
      await fetchProducts()
      return { data, error: null }
    } catch (err) {
      toast.error(err.message)
      return { data: null, error: err }
    }
  }

  const updateProduct = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast.success('Product updated successfully!')
      await fetchProducts()
      return { data, error: null }
    } catch (err) {
      toast.error(err.message)
      return { data: null, error: err }
    }
  }

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Product deleted successfully!')
      await fetchProducts()
      return { error: null }
    } catch (err) {
      toast.error(err.message)
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