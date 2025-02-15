import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

class ApiService {
    static async get(endpoint, params = {}) {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
            return response.data;
        } catch (error) {
            console.error(`Errore GET ${endpoint}:`, error);
            throw error;
        }
    }

    static async post(endpoint, data) {
        try {
            const response = await axios.post(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error(`Errore POST ${endpoint}:`, error);
            throw error;
        }
    }

    static async put(endpoint, data) {
        try {
            const response = await axios.put(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error(`Errore PUT ${endpoint}:`, error);
            throw error;
        }
    }

    static async delete(endpoint) {
        try {
            const response = await axios.delete(`${BASE_URL}${endpoint}`);
            return response.data;
        } catch (error) {
            console.error(`Errore DELETE ${endpoint}:`, error);
            throw error;
        }
    }
}

export default ApiService;
