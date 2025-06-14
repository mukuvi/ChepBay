import React, { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { mockUser } from '../lib/mockData'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser = {
        id: Date.now().toString(),
        email,
        ...userData
      }
      
      setUser(newUser)
      setProfile(newUser)
      
      toast.success('Account created successfully!')
      return { data: { user: newUser }, error: null }
    } catch (error) {
      toast.error('Failed to create account')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, always sign in as mock user
      setUser(mockUser)
      setProfile(mockUser)
      
      toast.success('Signed in successfully!')
      return { data: { user: mockUser }, error: null }
    } catch (error) {
      toast.error('Failed to sign in')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      setProfile(null)
      toast.success('Signed out successfully!')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const updateProfile = async (updates) => {
    try {
      const updatedProfile = { ...profile, ...updates }
      setProfile(updatedProfile)
      setUser(updatedProfile)
      
      toast.success('Profile updated successfully!')
      return { error: null }
    } catch (error) {
      toast.error('Failed to update profile')
      return { error }
    }
  }

  const deleteAccount = async () => {
    try {
      await signOut()
      toast.success('Account deleted successfully!')
      return { error: null }
    } catch (error) {
      toast.error('Failed to delete account')
      return { error }
    }
  }

  const fetchProfile = async (userId) => {
    // Mock implementation - in real app this would fetch from database
    return profile
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    deleteAccount,
    fetchProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}