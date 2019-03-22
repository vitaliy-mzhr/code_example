import axios from 'axios';
import { API_CONFIG } from './config';



export const api = axios.create(API_CONFIG);
export default api;
