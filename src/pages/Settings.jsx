import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Bell, 
  Shield, 
  Eye, 
  Trash2, 
  Lock, 
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun
} from 'lucide-react'
import toast from 'react-hot-toast'

const Settings = () => {
  const { user, deleteAccount } = useAuth()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      showOnlineStatus: true
    },
    theme: 'light'
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
    toast.success('Notification settings updated')
  }

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }))
    toast.success('Privacy settings updated')
  }

  const handleThemeChange = (theme) => {
    setSettings(prev => ({ ...prev, theme }))
    toast.success(`Theme changed to ${theme}`)
  }

  const handleDeleteAccount = async () => {
    const { error } = await deleteAccount()
    if (!error) {
      setShowDeleteConfirm(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <p className="text-gray-600">You need to be signed in to access settings.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and privacy settings</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Notifications */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications.email ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications.push ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications.sms ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                    <p className="text-sm text-gray-600">Receive promotional content and updates</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications.marketing ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Show Email Address</h3>
                    <p className="text-sm text-gray-600">Allow others to see your email address</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange('showEmail')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy.showEmail ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Show Phone Number</h3>
                    <p className="text-sm text-gray-600">Allow others to see your phone number</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange('showPhone')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy.showPhone ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.showPhone ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Show Online Status</h3>
                    <p className="text-sm text-gray-600">Let others know when you're online</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange('showOnlineStatus')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.privacy.showOnlineStatus ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Theme */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Theme</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                        settings.theme === 'light' 
                          ? 'border-primary-600 bg-primary-50 text-primary-600' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                        settings.theme === 'dark' 
                          ? 'border-primary-600 bg-primary-50 text-primary-600' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Account</h2>
              </div>
              
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Change Password</h3>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Export Data</h3>
                      <p className="text-sm text-gray-600">Download your account data</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full text-left p-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Trash2 className="h-5 w-5 text-red-600" />
                    <div>
                      <h3 className="font-medium text-red-900">Delete Account</h3>
                      <p className="text-sm text-red-600">Permanently delete your account and data</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Account</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings