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
            categorias.forEach((categoria) => {
                if (Array.isArray(this.props.historico)) {
                    for (let i = 0; i < this.props.historico.length; i++) {
                        try {
                            this.getCategoria(this.props.historico[i + 1]);
                        } catch (TypeError) {
                            let valorPrimeirasDosesInicial = this.props.historico[0].qtdPrimeiraDose;
                            let valorPrimeirasDosesFinal = this.props.historico[i].qtdPrimeiraDose;
                            let totalPrimeirasDoses = parseInt(valorPrimeirasDosesInicial) - parseInt(valorPrimeirasDosesFinal);

                            if (!valoresPrimeirasDoses.includes(Math.abs(totalPrimeirasDoses))) {
                                valoresPrimeirasDoses.push(Math.abs(totalPrimeirasDoses));
                            }

                            let valorSegundasDosesInicial = this.props.historico[0].qtdSegundaDose;
                            let valorSegundasDosesFinal = this.props.historico[i].qtdSegundaDose;
                            let totalSegundasDoses = parseInt(valorSegundasDosesInicial) - parseInt(valorSegundasDosesFinal);
                            if (!valoresSegundasDoses.includes(Math.abs(totalSegundasDoses))) {
                                valoresSegundasDoses.push(Math.abs(totalSegundasDoses));
                            }

                            let valorDosesReforcoInicial = this.props.historico[0].qtdDoseReforco;
                            let valorDosesReforcoFinal = this.props.historico[i].qtdDoseReforco;
                            let totalDosesReforco = parseInt(valorDosesReforcoInicial) - parseInt(valorDosesReforcoFinal);
                            if (!valoresDosesReforco.includes(Math.abs(totalDosesReforco))) {
                                valoresDosesReforco.push(Math.abs(totalDosesReforco));
                            }
                        }
                    }
                }
            });

            // Por fim, junta as informações e as seta como um estado ao gráfico.
            const newState = [];

            newState.push({
                name: 'Primeira dose',
                data: valoresPrimeirasDoses,
            });

            newState.push({
                name: 'Segunda dose',
                data: valoresSegundasDoses,
            });

            newState.push({
                name: 'Dose de reforço',
                data: valoresDosesReforco,
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
