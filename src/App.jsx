import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Search from './pages/Search'
import ProductDetail from './pages/ProductDetail'
import Sell from './pages/Sell'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import MyProducts from './pages/MyProducts'
import Messages from './pages/Messages'
import Cart from './pages/Cart'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: '#4ade80',
                  },
                },
                error: {
                  duration: 4000,
                  theme: {
                    primary: '#ef4444',
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App