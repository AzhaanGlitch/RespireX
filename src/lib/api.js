import axios from 'axios';
import { supabase } from './supabase'; 

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000, // 10 second timeout
});

// Track ongoing requests to prevent duplicates
const ongoingRequests = new Map();

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      // Create a unique key for this request
      const requestKey = `${config.method}-${config.url}`;
      
      // Check if this exact request is already in progress
      if (ongoingRequests.has(requestKey)) {
        console.log("⏸️ Duplicate request blocked:", requestKey);
        // Return the ongoing request promise instead of making a new one
        return ongoingRequests.get(requestKey);
      }

      console.log("🚀 API Request:", config.method?.toUpperCase(), config.url);
      
      // Get current session with timeout
      const sessionPromise = Promise.race([
        supabase.auth.getSession(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 3000)
        )
      ]);
      
      const { data } = await sessionPromise;
      const token = data?.session?.access_token;
      
      if (token) {
        console.log("✅ Token attached to request");
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No authentication token available");
      }

      // Store this request
      ongoingRequests.set(requestKey, config);

      return config;
    } catch (error) {
      console.error("❌ Request interceptor error:", error.message);
      // Continue with request even if token fetch fails
      return config;
    }
  },
  (error) => {
    console.error("❌ Request setup error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Clear the ongoing request
    const requestKey = `${response.config.method}-${response.config.url}`;
    ongoingRequests.delete(requestKey);
    
    console.log("✅ API Response:", response.config.url, response.status);
    return response;
  },
  async (error) => {
    // Clear the ongoing request
    if (error.config) {
      const requestKey = `${error.config.method}-${error.config.url}`;
      ongoingRequests.delete(requestKey);
    }
    
    console.error("❌ API Error:", error.config?.url, error.response?.status);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      console.log("🔒 Authentication error - session may have expired");
    } else if (error.response?.status === 403) {
      console.log("🚫 Permission denied");
    } else if (error.response?.status === 404) {
      console.log("🔍 Endpoint not found:", error.config?.url);
    } else if (!error.response) {
      console.error("🌐 Network error - backend may be down");
      error.message = "Cannot connect to server. Please check if the backend is running on http://localhost:8000";
    }
    
    return Promise.reject(error);
  }
);

export default api;