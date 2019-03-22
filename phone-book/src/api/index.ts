import axios from 'axios';
import { baseUrl } from './config';

export const fetchData = () => axios(`${baseUrl}/data/phones.json`);
