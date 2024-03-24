import create from 'zustand';
import axios from 'axios';

type User = {
    fullName: string;
    username: string;
    role: string;
    token: string;
};

type AuthState = {
    user: User | null;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (fullName: string, username: string, password: string, role: string) => Promise<void>;
    getUser: () => Promise<void>;
};

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    error: null,
    // In your auth store
    isAuthenticated: () => {
        return !!useAuthStore.getState().user;
    },
    login: async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            set({ user: response.data.user, error: null });
        } catch (error: any) {
            set({ error: error.message });
        }
    },
    logout: async () => {
        localStorage.removeItem('token');
        set({ user: null });
    },
    signup: async (fullName, username, password, role) => {
        try {
            await api.post('/auth/signup', {
                fullName,
                username,
                password,
                role,
            });
            set({ error: null });
        } catch (error: any) {
            set({ error: error.message });
        }
    },
    getUser: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            console.log('tokenclient', token);
            const { data: user } = await api.get('/auth/user', { headers: { Authorization: `Bearer ${token}` } });
            set({ user, error: null });
        } catch (error: any) {
            set({ error: error.message });
        }
    },
}));