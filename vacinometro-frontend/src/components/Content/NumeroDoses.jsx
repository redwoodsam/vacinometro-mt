import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './widgets/progressbar-custom-styles.css';


// Componente reponsável por mostrar os dados mais recentes da vacinação
function NumeroDoses(props) {

  return (
      <ul className="numero-doses-campos-list" >
        <li className="numero-doses-campo">
            <h4>1ª dose</h4>
            <input type="text" name="primeiradose" className="campoDoses" id="primeiraDoseCampo" readOnly="readonly" value={props.latestData.qtdPrimeiraDose ? props.latestData.qtdPrimeiraDose.toLocaleString("pt-BR") : "Sem dados"}/>
            <CircularProgressbar 
                id="primeira-dose" 
                value={props.latestData.porcentagemPrimeiraDose ? props.latestData.porcentagemPrimeiraDose : 0} 
                maxValue={100} 
                text={`${props.latestData.porcentagemPrimeiraDose ? props.latestData.porcentagemPrimeiraDose :  0}%`} 
            />
        </li>
        <li className="numero-doses-campo">
            <h4>2ª dose</h4>
            <input type="text" name="segundadose" className="campoDoses" id="segundaDoseCampo" readOnly="readonly" value={props.latestData.qtdSegundaDose ? props.latestData.qtdSegundaDose.toLocaleString("pt-BR") : "Sem dados"} />
            <CircularProgressbar 
                id="segunda-dose" 
                value={props.latestData.porcentagemSegundaDose ? props.latestData.porcentagemSegundaDose : 0} 
                maxValue={100} 
                text={`${props.latestData.porcentagemSegundaDose ? props.latestData.porcentagemSegundaDose : 0}%`} 
            />
        </li>
        <li className="numero-doses-campo">
            <h4>Dose de reforço</h4>
            <input type="text" name="dosereforco" className="campoDoses" id="doseReforcoCampo" readOnly="readonly" value={props.loading ? props.loading : props.latestData.qtdDoseReforco ? props.latestData.qtdDoseReforco.toLocaleString("pt-BR") : "Sem dados"} />
            <CircularProgressbar 
                id="primeira-dose" 
                value={props.latestData.porcentagemDoseReforco ? props.latestData.porcentagemDoseReforco : 0} 
                maxValue={100} 
                text={`${props.latestData.porcentagemDoseReforco ? props.latestData.porcentagemDoseReforco : 0}%`} 
            />
        </li>
    </ul>
)
}

export default NumeroDoses;