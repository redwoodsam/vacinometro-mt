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

            let categorias = []
            let doses = {};
            
            if (Array.isArray(this.props.historico)) {
                this.props.historico.forEach((dado) => {
                    let category = this.getCategoria(dado);

                    if (!categorias.includes(category)) categorias.push(category);
                });

                categorias.map( categoria => {
                    doses[categoria] = {
                        "primeirasDoses": [],
                        "segundasDoses": [],
                        "dosesReforco": []
                    };
                })

                this.props.historico.forEach((dado) => {

                    let currentCategory = this.getCategoria(dado);

                    doses[currentCategory]["primeirasDoses"].push(dado.qtdPrimeiraDose);
                    doses[currentCategory]["segundasDoses"].push(dado.qtdSegundaDose);
                    doses[currentCategory]["dosesReforco"].push(dado.qtdDoseReforco);
                })

                for( let mes in doses) {
                    for( let key in doses[mes] ) {
                        let maxIndex = doses[mes][key].length - 1;
                        if(maxIndex === 0) {
                            let previousMonthIndex = categorias.indexOf(mes) + 1;
                            let previousMonth = categorias[previousMonthIndex];
                            let previousMonthMaxIndex = doses[previousMonth][key].length - 1;
                            console.log(doses[previousMonth][key][previousMonthMaxIndex])

                            console.log(doses[previousMonth][key])

                            doses[mes][key] = (parseInt(doses[mes][key][0]) - parseInt(doses[previousMonth][key][previousMonthMaxIndex]));

                            continue;
                        }
                        doses[mes][key] = (parseInt(doses[mes][key][0]) - parseInt(doses[mes][key][maxIndex]));
                    }
                }
            }


            // Define as categorias
            this.setState({
                chartOptions: {
                    xaxis: {
                        categories: categorias,
                    },
                },
            });

            
            // // Por fim, junta as informações e as seta como um estado ao gráfico.
            // const newState = [];

            // newState.push({
            //     name: 'Primeira dose',
            //     data: totalPrimeirasDoses,
            // });

            // newState.push({
            //     name: 'Segunda dose',
            //     data: totalSegundasDoses,
            // });

            // newState.push({
            //     name: 'Dose de reforço',
            //     data: totalDosesReforco,
            // });

            // this.setState({
            //     series: newState,
            // });
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
