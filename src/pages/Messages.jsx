import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useChat } from '../hooks/useChat'
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  User
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const Messages = () => {
  const { user } = useAuth()
  const { conversations, messages, fetchMessages, sendMessage } = useChat()
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
    }
  }, [selectedConversation, fetchMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    await sendMessage(selectedConversation.id, newMessage.trim())
    setNewMessage('')
  }

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation)
  }

  const filteredConversations = conversations.filter(conv =>
    conv.product?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.buyer?.full_name || conv.seller?.full_name).toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getOtherParticipant = (conversation) => {
    return conversation.buyer_id === user?.id ? conversation.seller : conversation.buyer
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to view messages.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: 'calc(100vh - 8rem)' }}>
          <div className="flex h-full">
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => {
                    const otherParticipant = getOtherParticipant(conversation)
                    return (
                      <button
                        key={conversation.id}
                        onClick={() => handleConversationSelect(conversation)}
                        className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                          selectedConversation?.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {otherParticipant?.avatar_url ? (
                            <img
                              src={otherParticipant.avatar_url}
                              alt={otherParticipant.full_name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {otherParticipant?.full_name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.product?.title}
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <p>No conversations found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getOtherParticipant(selectedConversation)?.avatar_url ? (
                          <img
                            src={getOtherParticipant(selectedConversation).avatar_url}
                            alt={getOtherParticipant(selectedConversation).full_name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {getOtherParticipant(selectedConversation)?.full_name}
                          </h2>
                          <p className="text-sm text-gray-600">
                            About: {selectedConversation.product?.title}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                          <Phone className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                          <Video className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender_id === user.id
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_id === user.id ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <Paperclip className="h-5 w-5" />
                      </button>
                      
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900"
                        >
                          <Smile className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-400 mb-4">
                      <Send className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">
                      Choose a conversation from the sidebar to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages