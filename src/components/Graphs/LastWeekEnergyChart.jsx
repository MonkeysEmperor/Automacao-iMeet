import React from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import Chartist from "chartist";
import { energiaUltimaSemana } from 'database/DatabaseConnection';
import { reunioesPorDia } from "database/DatabaseConnection";
import { horasReservadasHoje } from "database/DatabaseConnection";

export class LastWeekEnergyChart extends React.Component {

    constructor(props) {
        super(props);
        const delays = 80,
         durations = 500;
        this.options = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            showLabel: true,
        };
        this.animation = {
            draw: function (data) {
                if (data.type === "line" || data.type === "area") {
                    data.element.animate({
                        d: {
                            begin: 600,
                            dur: 700,
                            from: data.path
                                .clone()
                                .scale(1, 0)
                                .translate(0, data.chartRect.height())
                                .stringify(),
                            to: data.path.clone().stringify(),
                            easing: Chartist.Svg.Easing.easeOutQuint
                        }
                    });
                } else if (data.type === "point") {
                    data.element.animate({
                        opacity: {
                            begin: (data.index + 1) * delays,
                            dur: durations,
                            from: 0,
                            to: 1,
                            easing: "ease"
                        }
                    });
                }
            }
        }

        this.state = {
            data: {},
            options: {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                showLabel: true,
            },
        }

    }

    parseJSONData(json) {
        const labels = [];
        const series = [[]];
        for (var weekday in json) {
            labels.push(weekday.slice(0, 3));
            series[0].push(json[weekday]);
        }
        return { labels: labels, series: series }
    }

    componentDidMount() {
        energiaUltimaSemana().then(result => {
            const parsedData = this.parseJSONData(result.data);
            let max = (Math.ceil(Math.max(...parsedData.series[0])));
            max = max + (20-max%10);
            this.setState((state) => Object.assign(state, {
                data: parsedData,
                options:{
                    ...state.options,
                    high: max,
                } 
            }))
        }).catch(error => console.log(error));
    }

    render() {
        const { classes } = this.props;
        return (
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="success">
                        <ChartistGraph
                            className="ct-chart"
                            data={this.state.data}
                            type="Line"
                            options={this.state.options}
                            listener={this.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Uso de energia na última semana</h4>
                        <p className={classes.cardCategory}>
                            <span className={classes.dangerText}>
                                <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                            </span>{" "}
                             em relação à semana anterior.
                        </p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> segunda semana de abril
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        )
    }

}