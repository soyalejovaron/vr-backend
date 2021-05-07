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
    let idL = 1;
    let lluvia = parseInt(data);
    let descripcion;
    let lecturaPorcentaje;
    let estado = "No está lloviendo";

    console.log(lluvia);
    if (lluvia < 300){ 
        descripcion = "¡Está lloviendo fuerte!";
        lecturaPorcentaje = 100;
        estado="LLoviendo";

    } else if (lluvia < 500){ 
        descripcion = "La lluvia es moderada";
        lecturaPorcentaje = 50;
        estado="Lloviendo";
    }else{
        descripcion = "No se ha detectado lluvia";
        lecturaPorcentaje = 0;
        estado= "No está lloviendo";
    }
   /*  const sql = `INSERT INTO registroHumedad SET ?`;
    const sensorObject = {
        porcentajeL: lecturaPorcentaje,
        estadoL: estado,
        descripcionL: descripcion
    };
    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        console.log("Registro guardado");
    }); */
    const sql = `UPDATE sensorL SET porcentajeL = '${lecturaPorcentaje}', estadoL = '${estado}' , descripcionL = '${descripcion}'
    WHERE idL = ${idL}`
    
    connection.query(sql, err => {
        if (err) throw err;
            console.log("Estado de lluvia actualizado");
        });
    
});

port.on('error', function(err){
    console.log(err);
});

server.listen(3001, ()=>{
    console.log('Servidor en el puerto: ', 3001);
});