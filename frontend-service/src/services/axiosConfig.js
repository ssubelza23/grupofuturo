import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const userServicesBaseURL = process.env.REACT_APP_USER_SERVICES_API_URL || 'http://localhost:3000';

export const projectsApi = axios.create({
  baseURL: `${baseURL}/api/projects`,
});

export const lotsApi = axios.create({
  baseURL: `${baseURL}/api/lots`,
});

export const blocksApi = axios.create({
  baseURL: `${baseURL}/api/blocks`,
});

export const streetsApi = axios.create({
  baseURL: `${baseURL}/api/streets`,
});

const token = localStorage.getItem('token');

export const usersApi = axios.create({
  baseURL: `${userServicesBaseURL}/api/users`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// Configuración para acceder a las imágenes en la carpeta uploads
export const uploadsApi = axios.create({
  baseURL: `${baseURL}/uploads`,
});