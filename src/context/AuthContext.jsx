// ============================================
// AUTHENTICATION CONTEXT
// Purpose: Global user state management
// Uses: Backend API for authentication
// ============================================

import React, { createContext, useState, useEffect } from "react"
import { auth as apiAuth } from "../services/api"

// Create context
export const AuthContext = createContext()

/**
 * AuthProvider Component
 * Wraps app and provides user authentication state
 * Uses backend API for authentication
 * @param {object} children - React components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in (has token)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token")
        if (token) {
          // Verify token by getting current user
          const response = await apiAuth.getCurrentUser()
          if (response.status && response.data?.user) {
            setUser(response.data.user)
          } else {
            // Token invalid, clear it
            localStorage.removeItem("access_token")
            setUser(null)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("access_token")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await apiAuth.login(email, password)
      
      if (response.status && response.data?.access_token) {
        // Save token
        localStorage.setItem("access_token", response.data.access_token)
        
        // Save user info
        if (response.data?.user) {
          setUser(response.data.user)
        }
        
        return { success: true, user: response.data.user }
      } else {
        return { success: false, error: response.message || "Login failed" }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("access_token")
    setUser(null)
  }

  // Register function
  const register = async (firstname, lastname, email, password, phone) => {
    try {
      const response = await apiAuth.register(
        firstname,
        lastname,
        email,
        password,
        phone
      )
      
      if (response.status) {
        return { success: true, message: response.message }
      } else {
        return { success: false, error: response.message || "Registration failed" }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Loading state for app startup
  if (loading) {
    return <div>Loading...</div>
  }

  // Provide user and auth functions to all children
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to use auth context
 * Usage: const { user, login, logout } = useAuth()
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
