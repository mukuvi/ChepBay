import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react'

const Profile = () => {
  const { user, profile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone_number: profile?.phone_number || '',
    bio: profile?.bio || '',
    location: profile?.location || ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setLoading(true)
    const { error } = await updateProfile(formData)
    if (!error) {
      setIsEditing(false)
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone_number: profile?.phone_number || '',
      bio: profile?.bio || '',
      location: profile?.location || ''
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary-600" />
                  </div>
                )}
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{profile?.full_name || 'User'}</h1>
                  <p className="text-primary-100">Member since {new Date(user.created_at || Date.now()).getFullYear()}</p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    {loading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-900">
                      <User className="h-5 w-5 text-gray-400" />
                      <span>{profile?.full_name || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-900">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{profile?.phone_number || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., University of Nairobi"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-900">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{profile?.location || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">About</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="input-field"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg min-h-[100px]">
                      {profile?.bio || 'No bio provided yet.'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>{new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">12</div>
                <div className="text-sm text-gray-600">Products Listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Items Sold</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">4.8</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile