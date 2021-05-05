const socket = io();

const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, width, height}} = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
};

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // Tipo de grafica
  type: 'bar',

  // La data para el dataset
  data: {
    labels: ["Serial"],
    datasets: [{
      label: "Sensor Humedad 1",
      backgroundColor: 'rgb(52, 73, 94)',
      borderColor: 'rgb(41, 128, 185)',
      data: [],
    }]
  },

  // Configuration options go here
  options: {
    plugins: {
      chartAreaBorder: {
        borderColor: 'blue',
        borderWidth: 2,
        borderDash: [2, 2], 
        borderDashOffset: 2,
      }
    }
  },
  plugins: [chartAreaBorder]
});

let counter = 0;
socket.on('humedad:data', function (dataSerial) {
  // console.log(dataSerial);
  chart.data.labels.push(counter);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.value);
  });
  counter++;
  chart.update();
});


