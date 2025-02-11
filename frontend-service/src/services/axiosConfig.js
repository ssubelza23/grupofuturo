import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://www.grupofuturo.com.ar/api';
const userServicesBaseURL = process.env.REACT_APP_USER_SERVICES_API_URL || 'https://www.grupofuturo.com.ar/api/users';

export const projectsApi = axios.create({
  baseURL: `${baseURL}/projects`,
});

export const lotsApi = axios.create({
  baseURL: `${baseURL}/lots`,
});

export const blocksApi = axios.create({
  baseURL: `${baseURL}/blocks`,
});

export const streetsApi = axios.create({
  baseURL: `${baseURL}/streets`,
});

const token = localStorage.getItem('token');

export const usersApi = axios.create({
  baseURL: `${userServicesBaseURL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// Configuración para acceder a las imágenes en la carpeta uploads
export const uploadsApi = axios.create({
  baseURL: `${baseURL}/uploads`,
});