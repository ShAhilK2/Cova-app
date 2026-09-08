import { api } from "../config/axios.js";


export const getMe = async () => {
    try {
        const {data} = await api.get('/api/me');
        return data;
    } catch (error) {
       console.error("Axios error:", error);
       return null;
    }
  
};