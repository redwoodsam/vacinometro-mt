import React from 'react';
import { Oval } from 'react-loading-icons';
import './Loading.css';

// Componente da tela de carregamento
function Loading() {
    return (
        <div className="loader-container">
            <div className="loader">
                <Oval stroke="#898B97" />
                <h3>Carregando...Por favor aguarde</h3>
            </div>
        </div>
    );
}

export default Loading;
