import { usersApi } from './axiosConfig';

export const getUserData = async () => {
  try {
    const response = await usersApi.get('/me'); // Asegúrate de que esta ruta sea correcta
    console.log('los datos del usuario:', response.data);
 
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    throw error;
  }
};