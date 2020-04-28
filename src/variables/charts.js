// ##############################
// // // javascript library for creating charts
// #############################


var MaterialDesign = require("assets/jss/material-dashboard-react.js");
var Chartist = require("chartist");

const chartColors = [MaterialDesign.infoColor[0], MaterialDesign.successColor[0],  MaterialDesign.warningColor[0], MaterialDesign.roseColor[0]];
//const chartColors = ['orange', 'blue', 'green','yellow'];
const getLastWeekUsage = (filter) => {
  const rand = Math.random()

  return rand > 0.5 ? [[26, 45, 20, 17, 5, 1, 0]] : [[12, 17, 7, 17, 23, 18, 38]]
}


// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################


// ##############################
// // // Email Subscriptions
// #############################

const emailsSubscriptionChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

const percentageConsumptionChart = {
  data: {
    labels: [
      "Ar-Condicionado",
      "Tomadas",
      "Iluminação",
    ],
    series: [5, 10, 15]
  },
  
  
  
};

// ##############################
// // // Completed Tasks
// #############################

const completedTasksChart = {
  data: {
    labels: ["8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"],
    series: [[23, 75, 45, 30, 28, 24, 20, 19, 34, 22]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  animation: {
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
};

module.exports = {
  emailsSubscriptionChart,
  completedTasksChart,
  percentageConsumptionChart,
};
