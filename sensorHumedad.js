const path = require('path');
const express = require('express');
const Serialport = require('serialport');
const ReadLine = Serialport.parsers.Readline;
const mysql = require('mysql');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
});
  
  // static files
app.use(express.static(path.join(__dirname, 'public')));
  


app.use(express.static(__dirname + '/public')); 

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

app.use(bodyParser.json());

// MYSQL 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'viveregistro'
});

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



const port = new Serialport('COM3',{
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function (){
    console.log('Conectado con exito');
});

parser.on('data', function (data){
    let humedad = parseInt(data);
    let descripcion;
    let lecturaPorcentaje;
    let estado = "Activo";
    let idSensorHumedad = 1;

    console.log(humedad);
    if (humedad >= 1000){
        descripcion = "El sensor está fuera de la tierra";
        lecturaPorcentaje = 0;
        porcentaje = 0;
        io.emit('humedad:data',{
            value: porcentaje
        });
    }
    else if (humedad < 1000 && humedad >= 600){
        descripcion = "El suela está seco";
        lecturaPorcentaje = 40;
        
        porcentaje = 40;
        io.emit('humedad:data',{
            value: porcentaje
        });
    }
    else if (humedad < 600 && humedad >= 450){
        descripcion = "El suela está humedo";
        lecturaPorcentaje = 60;
        porcentaje = 60;
        io.emit('humedad:data',{
            value: porcentaje
        });
    }
    else if (humedad < 450){ 
        descripcion = "¡El suelo está demasiado humedo!";
        lecturaPorcentaje = 100;
        porcentaje = 100;
        io.emit('humedad:data',{
            value: porcentaje
        });
    }
    const sql = `INSERT INTO registroHumedad SET ?`;
    const sensorObject = {
        porcentajeH: lecturaPorcentaje,
        estadoH: estado,
        descripcionH: descripcion,
        idSensorH: idSensorHumedad
    };
    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        console.log("Registro guardado");
    });
    
});

port.on('error', function(err){
    console.log(err);
});

server.listen(3000, ()=>{
    console.log('Servidor en el puerto: ', 3000);
});