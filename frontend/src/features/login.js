import { api } from "../config/axios.js";


export const login = async ({token}) => {
    try {
        const {data} = await api.post('/api/auth/login', {token});
        console.log("login data", data);
        return data;
    } catch (error) {
       console.error("Axios error:", error);
       return null;
    }
  
};

export const logOut = async () => {
    try {
        const {data} = await api.get('/api/auth/logout');
        return data;
    } catch (error) {
       console.error("Axios error:", error);
       return null;
    }
  
};