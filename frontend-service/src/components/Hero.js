import React from "react";
import "../styles/Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1>Encuentra tu Lote Ideal con Grupo Futuro</h1>
                    <p>Tu inversión segura, tu futuro garantizado. Consulta disponibilidad ahora.</p>
                    <div className="hero-buttons">
                        <a href="/projects" className="btn btn-primary">Ver Proyectos</a>
                        <a href="https://wa.me/+5492215693951?text=Hola,%20estoy%20interesado%20en%20más%20información%20sobre%20los%20lotes." className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Contáctanos</a>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
