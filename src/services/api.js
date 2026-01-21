/**
 * BACKEND API SERVICE
 * Base URL: https://spiritlife.tokinrides.com/api
 * Backend: Laravel
 */

const API_BASE_URL = "https://spiritlife.tokinrides.com/api"

/**
 * JSON request helper
 */
const makeRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options.headers,
  }

  const token = localStorage.getItem("access_token")
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  const text = await response.text()

  let data
  try {
    data = JSON.parse(text)
  } catch (err) {
    console.error("Non-JSON response:", text)
    throw new Error("Invalid server response")
  }

  if (!response.ok) {
    throw new Error(data?.message || "API request failed")
  }

  return data
}

/**
 * Multipart/form-data helper (uploads)
 */
const makeFormDataRequest = async (endpoint, formData, method = "POST") => {
  const url = `${API_BASE_URL}${endpoint}`

  const headers = {}
  const token = localStorage.getItem("access_token")
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method,
    headers,
    body: formData,
  })

  const text = await response.text()

  let data
  try {
    data = JSON.parse(text)
  } catch (err) {
    console.error("Non-JSON response:", text)
    throw new Error("Invalid server response")
  }

  if (!response.ok) {
    throw new Error(data?.message || "API request failed")
  }

  return data
}

/* ============================================
   AUTH
============================================ */

export const auth = {
  login: (email, password) =>
    makeRequest("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (firstname, lastname, email, password, phone) => {
    const fd = new FormData()
    fd.append("firstname", firstname)
    fd.append("lastname", lastname)
    fd.append("email", email)
    fd.append("password", password)
    fd.append("phone", phone)
    return makeFormDataRequest("/register", fd)
  },

  getCurrentUser: () =>
    makeRequest("/user", {
      method: "GET",
    }),
}

/* ============================================
   RHEMA MEDITATIONS (PUBLIC)
   Endpoint confirmed: /api/rhema
============================================ */

export const rhemaMeditations = {
  getAll: () =>
    makeRequest("/rhema", {
      method: "GET",
    }),

  getById: (id) =>
    makeRequest(`/rhema/${id}`, {
      method: "GET",
    }),
}

/* ============================================
   EVENTS
============================================ */

export const events = {
  getAll: () => makeRequest("/events"),
  getById: (id) => makeRequest(`/events/${id}`),

  create: (data) => {
    const fd = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        fd.append(key, value)
      }
    })
    return makeFormDataRequest("/events", fd)
  },

  update: (id, data) => {
    const fd = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        fd.append(key, value)
      }
    })
    return makeFormDataRequest(`/events/${id}`, fd, "PUT")
  },

  delete: (id) =>
    makeRequest(`/events/${id}`, {
      method: "DELETE",
    }),
}

/* ============================================
   SERMONS
============================================ */

export const sermons = {
  getAll: () => makeRequest("/sermons"),
  getById: (id) => makeRequest(`/sermons/${id}`),

  create: (data) => {
    const fd = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value) fd.append(key, value)
    })
    return makeFormDataRequest("/sermons", fd)
  },

  update: (id, data) => {
    const fd = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value) fd.append(key, value)
    })
    return makeFormDataRequest(`/sermons/${id}`, fd, "PUT")
  },

  delete: (id) =>
    makeRequest(`/sermons/${id}`, {
      method: "DELETE",
    }),
}

/* ============================================
   BLOGS
============================================ */

export const blogs = {
  getAll: () => makeRequest("/blogs"),
  getById: (id) => makeRequest(`/blogs/${id}`),

  create: (data) => {
    const fd = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value) fd.append(key, value)
    })
    return makeFormDataRequest("/blogs", fd)
  },

  update: (id, data) => {
    const fd = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value) fd.append(key, value)
    })
    return makeFormDataRequest(`/blogs/${id}`, fd, "PUT")
  },

  delete: (id) =>
    makeRequest(`/blogs/${id}`, {
      method: "DELETE",
    }),
}

/* ============================================
   NOTIFICATIONS
============================================ */

export const notifications = {
  sendBroadcast: (data) =>
    makeRequest("/notifications/broadcast", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}

/* ============================================
   DEFAULT EXPORT
============================================ */

export default {
  auth,
  rhemaMeditations,
  events,
  sermons,
  blogs,
  notifications,
}
