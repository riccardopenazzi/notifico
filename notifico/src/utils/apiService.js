import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const cookieJar = new CookieJar();
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

const BASE_URL = 'http://localhost:3000/api';

class ApiService {
    static async get(endpoint, params = {}) {
        try {
            const response = await client.get(`${BASE_URL}${endpoint}`, { params, withCredentials: true });
            return {
                success: true, //ridondante perchè già presente in response.data ma per ora lo tengo
                result: response.data,
                serverMessage: response?.serverMessage,
            };
        } catch (error) {
            console.error(`Errore GET ${endpoint}:`, error);
            return {
                success: false,
                message: error.response?.data?.error || 'Errore imprevisto',
                serverMessage: error.response?.data?.serverMessage,
            }
            // throw error;
        }
    }

    static async post(endpoint, data) {
        try {
            const response = await client.post(`${BASE_URL}${endpoint}`, data);
            return {
                success: true, //ridondante perchè già presente in response.data ma per ora lo tengo
                result: response.data,
                serverMessage: response?.serverMessage,
            };
        } catch (error) {
            console.error(`Errore POST ${endpoint}:`, error);
            return {
                success: false,
                message: error.response?.data?.error || 'Errore imprevisto',
                serverMessage: error.response?.data?.serverMessage,
            }
            // throw error;
        }
    }

    static async put(endpoint, data) {
        try {
            const response = await client.put(`${BASE_URL}${endpoint}`, data);
            return {
                success: true, //ridondante perchè già presente in response.data ma per ora lo tengo
                result: response.data,
                serverMessage: response?.serverMessage,
            };
        } catch (error) {
            console.error(`Errore PUT ${endpoint}:`, error);
            return {
                success: false,
                message: error.response?.data?.error || 'Errore imprevisto',
                serverMessage: error.response?.data?.serverMessage,
            }
            // throw error;
        }
    }

    static async delete(endpoint) {
        try {
            const response = await client.delete(`${BASE_URL}${endpoint}`);
            return {
                success: true, //ridondante perchè già presente in response.data ma per ora lo tengo
                result: response.data,
                serverMessage: response?.serverMessage,
            };
        } catch (error) {
            console.error(`Errore DELETE ${endpoint}:`, error);
            return {
                success: false,
                message: error.response?.data?.error || 'Errore imprevisto',
                serverMessage: error.response?.data?.serverMessage,
            }
            // throw error;
        }
    }
}

export default ApiService;
