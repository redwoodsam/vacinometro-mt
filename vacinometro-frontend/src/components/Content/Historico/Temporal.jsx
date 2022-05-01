import React from 'react';
import ApexChart from './ApexChart';
import './Temporal.css';

// Container que abriga o componente do gráfico de linha do tempo
function Temporal(props) {
    return (
        <div className="app-content-timeline-container">
            <h4 className="app-content-timeline-title">Linha do tempo</h4>
            <ApexChart historico={props.historico} />
        </div>
    );
}

export default Temporal;
