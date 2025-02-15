import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

class ApiService {
    static async get(endpoint, params = {}) {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
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
                serverMessage: error?.serverMessage,
            }
            // throw error;
        }
    }

    static async post(endpoint, data) {
        try {
            const response = await axios.post(`${BASE_URL}${endpoint}`, data);
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
                serverMessage: error?.serverMessage,
            }
            // throw error;
        }
    }

    static async put(endpoint, data) {
        try {
            const response = await axios.put(`${BASE_URL}${endpoint}`, data);
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
                serverMessage: error?.serverMessage,
            }
            // throw error;
        }
    }

    static async delete(endpoint) {
        try {
            const response = await axios.delete(`${BASE_URL}${endpoint}`);
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
                serverMessage: error?.serverMessage,
            }
            // throw error;
        }
    }
}

export default ApiService;
