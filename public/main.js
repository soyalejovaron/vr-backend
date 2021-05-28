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
  type: 'line',

  // La data para el dataset
  data: {
    labels: ["Serial"],
    datasets: [{
      label: "Humedad",
      backgroundColor: 'rgb(0, 0, 52)',
      borderColor: 'rgb(0, 0, 41)',
      data: [],
    }]
  },

  // Configuracion de la grafica
  options: {
    plugins: {
      chartAreaBorder: {
        borderColor: 'blue',
        borderWidth: 2,
        borderDash: [1, 1], 
        borderDashOffset: 2,
      }
    }
  },
  plugins: [chartAreaBorder]
});

/* Contador para los labels de la grafica */
let counter = 0;
socket.on('humedad:data', (dataSerial)=> {
  // console.log(dataSerial);
  chart.data.labels.push(counter);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.value);
  });
  counter++;
  chart.update();
});

var ctx2 = document.getElementById('myChart2').getContext('2d');
var chart2 = new Chart(ctx2, {
  // Tipo de grafica
  type: 'line',

  // La data para el dataset
  data: {
    labels: ["Serial"],
    datasets: [{
      label: "Temperatura",
      backgroundColor: 'rgb(52, 0, 0)',
      borderColor: 'rgb(41, 0, 0)',
      data: [],
    }]
  },

  // Configuracion de la grafica
  options: {
    plugins: {
      chartAreaBorder: {
        borderColor: 'red',
        borderWidth: 2,
        borderDash: [1, 1], 
        borderDashOffset: 2,
      }
    }
  },
  plugins: [chartAreaBorder]
});

/* Contador para los labels de la grafica */
let counter2 = 0;
socket.on('temperatura:data', (dataSerial)=> {
  // console.log(dataSerial);
  chart2.data.labels.push(counter2);
  chart2.data.datasets.forEach(dataset => {
    dataset.data.push(dataSerial.value);
  });
  counter2++;
  chart2.update();
});



