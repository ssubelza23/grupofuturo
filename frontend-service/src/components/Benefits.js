import React from "react";
import "../styles/Benefits.css";
import ubicacionestrategica from '../assets/images/ubicacionestrategica.jpg';
import financiamiento from '../assets/images/financiamiento.png';
import escritura from '../assets/images/escritura.webp';
import people from '../assets/images/people.png';


const Benefits = () => {
    return (
        <section className="benefits">
            <div className="container">
                <h2>¿Por qué elegir Grupo Futuro?</h2>
                <div className="benefits-list">
                    <div className="benefit-item">
                        <img src={ubicacionestrategica} alt="Ubicaciones estratégicas" />
                        <h3>Ubicaciones estratégicas</h3>
                        <p>Terrenos en zonas de alto crecimiento y plusvalía asegurada.</p>
                    </div>
                    <div className="benefit-item">
                        <img src={financiamiento} alt="Financiamiento flexible" />
                        <h3>Financiamiento flexible</h3>
                        <p>Planes de pago accesibles adaptados a tus necesidades.</p>
                    </div>
                    <div className="benefit-item">
                        <img src={escritura} alt="Escritura garantizada" />
                        <h3>Escritura garantizada</h3>
                        <p>Seguridad y confianza en cada compra con documentación en regla.</p>
                    </div>
                    <div className="benefit-item">
                        <img src={people} alt="Asesoría personalizada" />
                        <h3>Asesoría personalizada</h3>
                        <p>Te guiamos en todo el proceso para una inversión segura.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
