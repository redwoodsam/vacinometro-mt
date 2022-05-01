import React from 'react';
import './Error.css';

// Componente da mensagem de erro.
function Error() {
    return (
        <div className="error-container">
            <h2 className="error-text">Erro ao obter dados.<br/>Por favor tente novamente mais tarde.</h2>
        </div>
    );
}

export default Error;
