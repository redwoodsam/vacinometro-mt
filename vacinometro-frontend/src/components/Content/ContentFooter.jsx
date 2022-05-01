import React from 'react';
import './ContentFooter.css';

// Componente responsável por mostrar os dados da fonte dos dados
function ContentFooter(props) {
    function dataFormatada(dataAtualizacao) {
        let data = new Date(dataAtualizacao);
        let dia = data.getDate().toString();
        let diaComZero = dia.length === 1 ? `0${dia}` : dia;
        let mes = (data.getMonth() + 1).toString();
        let mesComZero = mes.length === 1 ? `0${mes}` : mes;
        let ano = data.getFullYear();

        return diaComZero + '/' + mesComZero + '/' + ano;
    }

    return (
        <div className="app-content-footer">
            <span className="app-content-lastUpdatedAt">
                Última atualização: {props.dataAtualizacao ? dataFormatada(props.dataAtualizacao) : '00/00/0000'}
            </span>
            <h4 className="app-content-source">Fonte: Secretaria Estadual de Saúde/MT</h4>
        </div>
    );
}

export default ContentFooter;
