import "../styles/proyects.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { projectsApi} from '../services/axiosConfig';
const Projects = () => {
     const [projects, setProjects] = useState([]);
      useEffect(() => {
        projectsApi.get('/')
          .then(response => {
            setProjects(response.data);
          console.log(response.data);
          })
          .catch(error => console.error('Error fetching projects:', error));
      }, []);
    return (
        <section className="projects">
            <div className="container">
                <h1>Nuestros Proyectos</h1>
                <p>Explora los desarrollos en las mejores ubicaciones para tu inversión.</p>
                <div className="projects-list">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <img src={`https://www.grupofuturo.com.ar/uploads/${project.photos[0]}`} alt={project.name} />
                            <h3>{project.name}</h3>
                            <p>{project.location}</p>
                            <p>{project.description}</p>
                            <Link to={`/projects/${project.id}`} className="btn btn-primary">
                                Ver Detalles
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
