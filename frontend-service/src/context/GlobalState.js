import React, { createContext, useState, useEffect } from 'react';
import { projectsApi, lotsApi, blocksApi, streetsApi } from '../services/axiosConfig';

// Crear el contexto
export const GlobalContext = createContext();

// Proveedor de contexto
export const GlobalProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [lots, setLots] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [streets, setStreets] = useState([]);

    useEffect(() => {
        projectsApi.get('/')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    useEffect(() => {
        const fetchLots = async () => {
            try {
                const response = await lotsApi.get('/');
                setLots(response.data);
            } catch (error) {
                console.error('Error fetching lots:', error);
            }
        };

        fetchLots();
    }, []);

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const response = await blocksApi.get('/');
                setBlocks(response.data);
            } catch (error) {
                console.error('Error fetching blocks:', error);
            }
        };

        fetchBlocks();
    }, []);

    useEffect(() => {
        const fetchStreets = async () => {
            try {
                const response = await streetsApi.get('/');
                setStreets(response.data);
            } catch (error) {
                console.error('Error fetching streets:', error);
            }
        };

        fetchStreets();
    }, []);

    return (
        <GlobalContext.Provider value={{ projects, lots, blocks, streets }}>
            {children}
        </GlobalContext.Provider>
    );
};