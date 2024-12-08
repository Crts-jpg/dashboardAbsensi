import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = 'http://103.186.1.3:3100';
const API_PASSWORD = 'admin123'; // Replace with the actual API password
const API_USERNAME = 'admin'; // Replace with the actual API username

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/login`,
            { username, password }
        );
        return response.data.token;
    } catch (err) {
        console.error('login error', err);
        throw new Error('Invalid username or password');
    }
};

export const getAllUser = async () => {
    try {
        const token = Cookies.get('token');
        console.log('Token being sent in request:', token); // Debug token sebelum dikirim

        if (!token) {
            throw new Error('No token found in cookies');
        }

        const response = await axios.get(`${BASE_URL}/api/admin/user/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-API-PASSWORD': API_PASSWORD,
                'X-API-USERNAME': API_USERNAME,
            },
        });

        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error('Error response:', err.response?.status, err.response?.data);
            if (err.response?.status === 401) {
                throw new Error('Unauthorized access - please login again');
            }
        } else {
            console.error('Error in getAllUser:', err.message);
        }
        throw new Error('Failed to fetch user data');
    }
};

export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  // Gunakan interface ini pada fungsi seperti:
  export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>('/api/users');
    return response.data;
  };

  export interface User {
    id: number;
    name: string;
    email: string;
    attendanceDate: string;
    attendanceTime: string;
    attendanceCount: number;
    active: boolean;
  }
  
