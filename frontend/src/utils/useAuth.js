import { create } from 'zustand';
import axios from 'axios';

// Correctly reads the environment variable set by Vite
const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const useAuth = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: '',

    signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.post('/auth/signup', { name, email, password });
            set({
                user: response.data.user || response.data.userData,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || 'Error signing up',
                isLoading: false,
            });
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await API.post(`/auth/verify-email`, { code })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data
        } catch (error) {
            set({
                error: error?.response?.data?.message || 'Error Verifying Email',
                isLoading: false,
            })
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {
            const response = await API.get('/auth/check-auth')
            set({ user: response.data.user || response.data.userData, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            console.log(error)
            set({ error: null, isCheckingAuth: false, isAuthenticated: false })
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await API.post('/auth/login', { email, password })
            set({
                user: response.data.user || response.data.userData,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (error) {
            set({
                error: error?.response?.data?.message || 'Error log in',
                isLoading: false,
            })
            throw error
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            await API.post(`/auth/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    forgetPassword: async (email) => {
        set({ isLoading: true, error: null })
        try {
            const response = await API.post('/auth/forget-password', { email })
            set({
                message: response.data.message,
                isLoading: false,
            })
        } catch (error) {
            set({
                error: error?.response?.data?.message || 'Error Reset Password',
                isLoading: false,
            })
            throw error
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await API.post(`/auth/reset-password/${token}`, { password })
            set({ message: response.data.message, isLoading: false })
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || 'Error Reset Password',
            })
            throw error
        }
    }
}));