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
import { energiaMesPassadoPorEquipamento } from "database/DatabaseConnection";

const MaterialDesign = require("assets/jss/material-dashboard-react.js");
const chartColors = [MaterialDesign.infoColor[0], MaterialDesign.successColor[0],  MaterialDesign.warningColor[0], MaterialDesign.roseColor[0]];
export class LastMonthEnergyChart extends React.Component {

    constructor(props) {
        super(props);
        const delays = 80,
            durations = 500;
        this.options = {
            donut: true,
            donutWidth: 35,
        };
        
        this.responsiveOptions = [
            ['screen and (min-width: 640px)', {
                chartPadding: 15,
                labelOffset: 30,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 30,
                chartPadding: 16
            }]
        ];
        this.animation = {
            draw: function (data) {
                if (data.type === 'slice') {
                    if (chartColors[data.index]) {
                        data.element._node.setAttribute('style', 'stroke: ' + chartColors[data.index] + '; stroke-width: ' + 35 + 'px');
                    }
                    // Get the total path length in order to use for dash array animation
                    var pathLength = data.element._node.getTotalLength();

                    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                    data.element.attr({
                        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                    });

                    // Create animation definition while also assigning an ID to the animation for later sync usage
                    var animationDefinition = {
                        'stroke-dashoffset': {
                            id: 'anim' + data.index,
                            dur: 500,
                            from: -pathLength + 'px',
                            to: '0px',
                            easing: Chartist.Svg.Easing.easeOutQuint,
                            // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                            fill: 'freeze'
                        }
                    };

                    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                    if (data.index !== 0) {
                        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                    }

                    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                    data.element.attr({
                        'stroke-dashoffset': -pathLength + 'px'
                    });

                    // We can't use guided mode as the animations need to rely on setting begin manually
                    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                    data.element.animate(animationDefinition, false);
                }
            }
        };

        this.state= {
            data: {},
        }

    }

    parseJSONData(json) {
        const labels = [];
        const series = [];
        for (var equipment in json) {
            let label = equipment.split('energia_')[1];
            label = label.charAt(0).toUpperCase() + label.slice(1);
            if (label === 'Total') continue;
            if (label ===   'Arcond') label = 'Ar-Condicionado';
            labels.push(label);
            series.push(json[equipment]);
        }
        return { labels: labels, series: series }
    }

    componentDidMount(){
        energiaMesPassadoPorEquipamento().then(result => {
            const parsedData = this.parseJSONData(result.data)
            this.setState((state) => Object.assign(state, {
                data: parsedData,
            }));
          }).catch(error => console.log(error));

    }

    render() {
        const { classes } = this.props;
        return (
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="rose">
                        <ChartistGraph
                            className="ct-chart"
                            data={this.state.data}
                            type="Pie"
                            options={this.options}
                            responsiveOptions={this.responsiveOptions}
                            listener={this.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Uso de energia por equipamento</h4>
                        <p className={classes.cardCategory}>Último mês</p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> março
              </div>
                    </CardFooter>
                </Card>
            </GridItem>
        )
    }

}