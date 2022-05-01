import React, { useEffect, useState } from 'react';
import NumeroDoses from './NumeroDoses';
import './NumeroDoses.css';
import './Content.css';
import Historico from './Historico';
import ContentFooter from './ContentFooter';
import axios from 'axios';
import Loading from './widgets/Loading';
import Error from './widgets/Error';

const API_URL = process.env.REACT_APP_API_URL;

// Componente contendo todo o conteúdo da Dashboard.
function Content() {
    // Estados dos dados
    const [latestData, setLatestData] = useState('');
    const [last24HoursData, setLast24HoursData] = useState('');
    const [historico, setHistorico] = useState('');

    // Estados gerais
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Hook inicial - Requisita todos os dados da API e despacha para os componentes que os utilizarão
    useEffect(() => {
        setLoading(true);

        // Últimos dados
        axios.get(`${API_URL}latestdata`)
            .then((response) => {
                setLatestData(response.data[0]);
            })
            .catch((err) => {
                setLoading(false);
                setError(true);
                console.error('Erro ao obter dados da API: ' + err.message);
            });

        // Últimas 24 horas
        axios.get(`${API_URL}last24hours`)
            .then((response) => {
                setLast24HoursData(response.data);
            })
            .catch((err) => {
                setLoading(false);
                setError(true);
                console.error('Erro ao obter dados da API: ' + err.message);
            });

        // Dados históricos
        axios.get(`${API_URL}historydata`)
            .then((response) => {
                setLoading(false);
                setHistorico(response.data);
            })

            .catch((err) => {
                setError(true);
                setLoading(false);
                console.error('Erro ao obter dados da API: ' + err.message);
            });
    }, []);

    return (
        <main className="app-content-container">
            {error && <Error failedItems={error.failedItems} />}
            <h2 className="app-content-container-title">Total de doses aplicadas (em relação à população) </h2>
            <NumeroDoses latestData={latestData} />
            <Historico historico={historico} last24HoursData={last24HoursData} />
            <ContentFooter dataAtualizacao={latestData.dataAtualizacao} />
            {loading && <Loading />}
        </main>
    );
}

export default Content;
