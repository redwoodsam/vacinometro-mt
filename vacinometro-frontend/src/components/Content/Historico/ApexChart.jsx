import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import './ApexChart.css';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 350,
                    foreColor: '#fff',
                    zoom: {
                        enabled: true,
                        type: 'x',
                        autoScaleYaxis: false,
                        zoomedArea: {
                            fill: {
                                color: '#90CAF9',
                                opacity: 0.4,
                            },
                            stroke: {
                                color: '#0D47A1',
                                opacity: 0.4,
                                width: 1,
                            },
                        },
                    },
                    toolbar: {
                        show: true,
                        tools: {
                            reset: true,
                            zoomIn: true,
                            zoomOut: true,
                            download: false,
                            selection: false,
                        },
                        autoSelected: 'zoom',
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '100%',
                        endingShape: 'rounded',
                        dataLabels: {
                            position: 'top',
                        },
                        rangeBarOverlap: false,
                        rangeBarGroupRows: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: '',
                    tickPlacement: 'between',
                    offsetX: 10,
                    max: 5,
                },
                yaxis: {
                    title: {
                        text: 'Quantidade de Doses',
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + ' doses';
                        },
                    },
                    theme: 'dark',
                },
            },
        };
    }

    // Função responsável por converter a string da data de atualização do dado para um período
    getCategoria(dado) {
        let meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        let date = new Date(dado.dataAtualizacao);
        let mes = meses[date.getMonth()];
        let ano = date.getFullYear();

        let fullDate = `${mes}/${ano}`;

        return fullDate;
    }

    componentDidUpdate(prevProp) {
        if (this.props !== prevProp) {
            let valoresPrimeirasDoses = [];
            let valoresSegundasDoses = [];
            let valoresDosesReforco = [];

            let categorias = [];

            if (Array.isArray(this.props.historico)) {
                this.props.historico.forEach((dado) => {
                    let category = this.getCategoria(dado);

                    if (!categorias.includes(category)) categorias.push(category);
                });
            }

            // Define as categorias
            this.setState({
                chartOptions: {
                    xaxis: {
                        categories: categorias,
                    },
                },
            });

            // Algoritmo responsável por separar os dados de acordo com o seu período
            // e obter o número total de doses de acordo com o período
            let inicio = this.props.historico.length - 1;
            let fim = this.props.historico.length - 2;

            let contadorPrimeirasDoses = 0;
            let contadorSegundasDoses = 0;
            let contadorDosesReforco = 0;


            let totalPrimeirasDoses = [];
            let totalSegundasDoses = [];
            let totalDosesReforco = [];

            if (Array.isArray(this.props.historico)) {

                try {
                    for (let i = inicio; i >= 0; i--) {
    
        
                        this.getCategoria(this.props.historico[i - 1]);
    
                        let categoriaAtual = this.getCategoria(this.props.historico[i]);
                        let proximaCategoria = this.getCategoria(this.props.historico[i - 1]);
                        
                        let valorPrimeirasDosesInicial = this.props.historico[inicio].qtdPrimeiraDose;
                        let valorPrimeirasDosesFinal = this.props.historico[fim].qtdPrimeiraDose;
                        
                        let valorSegundasDosesInicial = this.props.historico[inicio].qtdSegundaDose;
                        let valorSegundasDosesFinal = this.props.historico[fim].qtdSegundaDose;
                        
                        let valorDosesReforcoInicial = this.props.historico[inicio].qtdDoseReforco;
                        let valorDosesReforcoFinal = this.props.historico[fim].qtdDoseReforco;
                        
                        contadorPrimeirasDoses += (parseInt(valorPrimeirasDosesFinal) - parseInt(valorPrimeirasDosesInicial));
                        contadorSegundasDoses += (parseInt(valorSegundasDosesFinal) - parseInt(valorSegundasDosesInicial));
                        contadorDosesReforco += (parseInt(valorDosesReforcoFinal) - parseInt(valorDosesReforcoInicial));
    
    
                        if (proximaCategoria != categoriaAtual) {
    
                            
                            inicio = i;
                            fim = i - 1;
                            
                            if (!valoresPrimeirasDoses.includes(Math.abs(contadorPrimeirasDoses))) {
                                totalPrimeirasDoses.push(Math.abs(contadorPrimeirasDoses));
                                contadorPrimeirasDoses = 0;
                            }
    
                            if (!valoresSegundasDoses.includes(Math.abs(contadorSegundasDoses))) {
                                totalSegundasDoses.push(Math.abs(contadorSegundasDoses));
                                contadorSegundasDoses = 0;
    
                            }
    
                            if (!valoresDosesReforco.includes(Math.abs(contadorDosesReforco))) {
                                totalDosesReforco.push(Math.abs(contadorDosesReforco));
                                contadorDosesReforco = 0;
                                
                            }
                        }
    
                        inicio -= 1;
                        fim -= 1;
    
                    }

                } catch {

                }
            }

            // Por fim, junta as informações e as seta como um estado ao gráfico.
            const newState = [];

            newState.push({
                name: 'Primeira dose',
                data: totalPrimeirasDoses,
            });

            newState.push({
                name: 'Segunda dose',
                data: totalSegundasDoses,
            });

            newState.push({
                name: 'Dose de reforço',
                data: totalDosesReforco,
            });

            this.setState({
                series: newState,
            });
        }
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.chartOptions} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }
}

export default Chart;
