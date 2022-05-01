import React from 'react';
import './Historico.css';
import Temporal from './Historico/Temporal';
import Ultimas24Horas from './Historico/Ultimas24Horas';

// Container que abriga os dois componentes que mostram dados temporais
function Historico(props) {
    return (
        <div className="app-content-history">
            <Temporal historico={props.historico} error={props.error} loading={props.loading} />
            <Ultimas24Horas last24HoursData={props.last24HoursData} error={props.error} loading={props.loading} />
        </div>
    );
}

export default Historico;
