import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export const useChat = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchConversations = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          buyer:buyer_id (full_name, avatar_url),
          seller:seller_id (full_name, avatar_url),
          product:product_id (title, images)
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('updated_at', { ascending: false })

      if (error) throw error

      setConversations(data || [])
    } catch (err) {
      console.error('Error fetching conversations:', err)
    }
  }

  const fetchMessages = async (conversationId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (full_name, avatar_url)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error

      setMessages(data || [])
    } catch (err) {
      console.error('Error fetching messages:', err)
    }
  }

  const createConversation = async (productId, sellerId) => {
    if (!user) return null

    try {
      // Check if conversation already exists
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('product_id', productId)
        .eq('buyer_id', user.id)
        .eq('seller_id', sellerId)
        .single()

      if (existing) {
        return existing.id
      }

      // Create new conversation
      const { data, error } = await supabase
        .from('conversations')
        .insert([
          {
            product_id: productId,
            buyer_id: user.id,
            seller_id: sellerId
          }
        ])
        .select()
        .single()

      if (error) throw error

      await fetchConversations()
      return data.id
    } catch (err) {
      toast.error('Failed to start conversation')
      return null
    }
  }

  const sendMessage = async (conversationId, content) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            sender_id: user.id,
            content
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId)

      await fetchMessages(conversationId)
      await fetchConversations()
    } catch (err) {
      toast.error('Failed to send message')
    }
  }

  useEffect(() => {
    if (user) {
      fetchConversations()
      setLoading(false)
    }
  }, [user])

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return

    const messagesSubscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages' 
        }, 
        (payload) => {
          setMessages(prev => [...prev, payload.new])
        }
      )
      .subscribe()

    const conversationsSubscription = supabase
      .channel('conversations')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'conversations' 
        }, 
        () => {
          fetchConversations()
        }
      )
      .subscribe()

    return () => {
      messagesSubscription.unsubscribe()
      conversationsSubscription.unsubscribe()
    }
  }, [user])

  return {
    conversations,
    messages,
    loading,
    fetchConversations,
    fetchMessages,
    createConversation,
    sendMessage
  }
}