import axios from 'axios'

const api = axios.create({
  // Leave empty for the self-contained preview; set VITE_API_URL when a backend is deployed separately.
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true,
})

export default api
