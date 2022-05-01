import React from 'react';
import './Ultimas24Horas.css';

// Componente do widget de últimas doses aplicadas
function Ultimas24Horas(props) {
    return (
        <div className="app-content-ultimas24horas">
            <h3>Últimas 24 horas</h3>
            <ul className="ultimas24horas-field-list">
                <li className="ultimas24horas-field">
                    <h4>Primeiras doses: </h4>
                    <input
                        className="ultimas24horas-field-value"
                        readOnly="readonly"
                        value={props.last24HoursData.primeirasDoses ? props.last24HoursData.primeirasDoses.toLocaleString('pt-BR') : 0}
                    />
                </li>
                <li className="ultimas24horas-field">
                    <h4>Segundas doses: </h4>
                    <input
                        className="ultimas24horas-field-value"
                        readOnly="readonly"
                        value={props.last24HoursData.segundasDoses ? props.last24HoursData.segundasDoses.toLocaleString('pt-BR') : 0}
                    />
                </li>
                <li className="ultimas24horas-field">
                    <h4>Doses de reforço: </h4>
                    <input
                        className="ultimas24horas-field-value"
                        readOnly="readonly"
                        value={props.last24HoursData.dosesReforco ? props.last24HoursData.dosesReforco.toLocaleString('pt-BR') : 0}
                    />
                </li>
            </ul>
        </div>
    );
}

export default Ultimas24Horas;
