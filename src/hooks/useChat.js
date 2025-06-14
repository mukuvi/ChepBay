import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { mockConversations, mockMessages } from '../lib/mockData'

export const useChat = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchConversations = async () => {
    if (!user) return

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setConversations(mockConversations)
    } catch (err) {
      console.error('Error fetching conversations:', err)
    }
  }

  const fetchMessages = async (conversationId) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const conversationMessages = mockMessages.filter(
        msg => msg.conversation_id === conversationId
      )
      
      setMessages(conversationMessages)
    } catch (err) {
      console.error('Error fetching messages:', err)
    }
  }

  const createConversation = async (productId, sellerId) => {
    if (!user) return null

    try {
      // Check if conversation already exists
      const existing = conversations.find(conv => 
        conv.product_id === productId && 
        conv.buyer_id === user.id && 
        conv.seller_id === sellerId
      )

      if (existing) {
        return existing.id
      }

      // Create new conversation
      const newConversation = {
        id: Date.now().toString(),
        product_id: productId,
        buyer_id: user.id,
        seller_id: sellerId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setConversations(prev => [newConversation, ...prev])
      return newConversation.id
    } catch (err) {
      toast.error('Failed to start conversation')
      return null
    }
  }

  const sendMessage = async (conversationId, content) => {
    if (!user) return

    try {
      const newMessage = {
        id: Date.now().toString(),
        conversation_id: conversationId,
        sender_id: user.id,
        content,
        created_at: new Date().toISOString(),
        sender: user
      }

      setMessages(prev => [...prev, newMessage])
      
      // Update conversation timestamp
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, updated_at: new Date().toISOString() }
          : conv
      ))
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