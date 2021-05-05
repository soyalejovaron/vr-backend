const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

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


const Serialport = require('serialport');
const ReadLine = Serialport.parsers.Readline;

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
    console.log(humedad);
    
    const sql = `INSERT INTO registroHumedad SET ?`;
    const sensorObject = {
        porcentajeH: lecturaPorcentaje,
        estadoH: estado,
        descripcionH: descripcion,
    };
    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        console.log("Registro guardado");
    });
    
});

port.on('error', function(err){
    console.log(err);
});