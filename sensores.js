/* Nota: Recuerda que las constantes son un espacio de almacenamiento que se reserva para un serie de datos,
ademas, una vez se define esta, su valor no puede cambiar en el tiempo */ 

const path = require('path');
// Creamos una constante donde instanciaremos y guardaremos express, el cual usaremos para crear nuestro servidor 
const express = require('express');
// En una constante, guardamos y requerimos el modulo "serialport", el cual nos ayudará a conectarnos al puerto serial del arduino
const Serialport = require('serialport');
// En esta constante, usaremos el metodo "parsers" y "ReadLine", los cuales nos permitiran leer y guardar los datos que recibimos a través del puerto serial
const ReadLine = Serialport.parsers.Readline;
// En una constante guardamos el modulo o mejor dicho, el driver de conexión de MySql, el cual nos ayudará a comunicarnos, generar consultar con MySql
const mysql = require('mysql');

// En una constante con N nombre, instanciaremos express, con el fin de poder hacer uso de todas sus funcionalidad, pasarle datos, crear rutas, etc.
const app = express();
// En una constante requeriremos el modulo "http" y le pasaremos el servidor de "express", lo cual nos posibilita comunicarnos con este protocolo con otros servidores
const server = require('http').Server(app);
// En una constante requerimos socket, en el cual requerimos el modulo de "socket.io", y le pasaremos la constante donde anteriormente guardamos express
const io = require('socket.io')(server);

/* Empezaremos a crear APIS rest: estas, son una serie de metodos funcionales, los cuales en este caso, se encargaran de ejecutar las consultas SQL de MySQL,
donde habrán dos parametros fundamentales, el req y el res. El primero nos servirá para requerir datos de angular y así enviarlos a MySQL, ademas,
le daremos una respuesta al usuario, donde dependiendo de lo que se requiera, se dará una respuesta diferente, puede ser un mensaje o una serie de datos que el usuario
no verá pero que el fronted usará para mostrarlos o hacer multiples operaciones o validaciones. */

// Creamos la primera ruta, la cual será la encargada de darle la bienvenida al usuario, o sea, será la primer interfaz visible, ademas, le indicamos que archivo html se renderizará al entrar
app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
});
  
// Especificamos donde se encontraran los archivos estaticos, asi como, las imagenes, el html, el css, el js, etc.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public')); 

// Creamos una constante donde requeriremos body-parser, la cual nos ayudará a acceder al cuerpo de las peticiones que se hagan de N clientes, en este caso, angular
const bodyParser = require('body-parser');

/* Creamos una constante donde guardaremos el puerto por el cual correrá el servidor de express */
const PORT = process.env.PORT || 3050;
app.use(bodyParser.json());

/* Creamos una constante para almacenar y crear la conexión y su configuración necesaria para acceder al servidor y base de datos de MySQL
para eso, usamos el metodo "createConnection", indicando a su vez la librería de MySQL*/ 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'viveregistro'
});

// Usamos el metodo "use", para configurar las cabeceras y los CORS del servidor, donde indicaremos los permisos, peticiones, formatos, las cuales permitiran al servidor de express comunicarse con otros servidores sin problemas */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// En la constante "port" instanciaremos el modulo de "serialport", donde indicaremos el puerto USB por el cual se está conectando el arduino, ademas, indicaremos los voltios con los cuales se estan mandando los datos del mismo
const port = new Serialport('COM3',{
    baudRate: 9600
});

// En una constante, guardamos el resultado de darle un formato a los datos provenientes del puerto del arduino, el cual está guardado en una constante "port"
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

// Iniciamos un stream o un evento, el cual me indicará el inicio del stream, o sea, cuando el puerto serial envie señales
parser.on('open', ()=>{
    console.log('Conectado con exito');
});

/* Seguimos con el stream que ya iniciamos, el cual se encargará de guardar los datos que llegan por el puerto del arduino, 
aqui haremos multiples validaciones a este string que llega, y a su vez, lo enviaremos a una consulta MySQL, donde se guardaran y enviaran estos datos
*/
parser.on('data', (data)=>{
    //En un array guardamos todos los datos que lleguen por el puerto serial, y los separaremos con una coma, así los separaremos e identificaremos cada uno
    datos = data.split(',');
    v_lluvia = datos[0];
    v_humedad = datos[1];
    v_humedadPorcentaje = datos[2];
    v_temperatura = datos[3];

    //Declaramos las variables principales
    let descripcionLluvia;
    let descripcionHumedad;
    let descripcionTemperatura;
    let porcentajeLluvia;
    let porcentajeHumedad;
    let porcentajeTemperatura;
    let estadoHumedad;
    let estadoLluvia;

    let idSensorHumedad = 1;
    let idL = 1;
    let idSensorTemperatura = 1;

    // Mostramos estos datos que llegan para verificar si estan entrando correctamente
    console.log(v_lluvia);
    console.log(v_humedadPorcentaje);
    console.log(v_temperatura);
    
    //Iniciamos las validaciones, para ello, usamos condicionales donde dependiendo de la cantidad de resistencia que se emita, podemos calcular el nivel de humedad de la planta
    if (v_humedad >= 1000){
        descripcionHumedad = "El sensor está fuera de la tierra";
        porcentajeHumedad = v_humedadPorcentaje;
        estadoHumedad="Activo";
        io.emit('humedad:data',{
            value: v_humedadPorcentaje
        });
    }
    else if (v_humedad < 1000 && v_humedad >= 600){
        descripcionHumedad = "El suela está seco";
        porcentajeHumedad = v_humedadPorcentaje;
        estadoHumedad="Activo";
        io.emit('humedad:data',{
            value: v_humedadPorcentaje
        });
    }
    else if (v_humedad < 600 && v_humedad >= 450){
        descripcionHumedad = "El suela está humedo";
        porcentajeHumedad = v_humedadPorcentaje;
        estadoHumedad="Activo";
        io.emit('humedad:data',{
            value: v_humedadPorcentaje
        });
    }
    else if (v_humedad < 450){ 
        descripcionHumedad = "¡El suelo está demasiado humedo!";
        porcentajeHumedad = v_humedadPorcentaje;
        estadoHumedad="Activo";
        io.emit('humedad:data',{
            value: v_humedadPorcentaje
        });
    }
    // Creamos la consulta SQL, para enviar los datos a la base de datos MySQL
    const sql = `INSERT INTO registroHumedad SET ?`;
    const sensorObject = {
        porcentajeH: porcentajeHumedad,
        estadoH: estadoHumedad,
        descripcionH: descripcionHumedad,
        idSensorH: idSensorHumedad
    };
    // Ejecutamos el query y capturamos errores
    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        console.log("Registro de humedad guardado");
    });

    //Iniciamos las validaciones, para ello, usamos condicionales donde dependiendo de la cantidad de resistencia que se emita, podemos calcular el nivel de humedad de la planta
    if (v_temperatura > 30 ){
        descripcionTemperatura = "El aire es caliente";
        estadoTemperatura="Activo";
        io.emit('temperatura:data',{
            value: v_temperatura
        });
    }else if (v_temperatura < 30 && v_temperatura > 20 ){
        descripcionTemperatura = "El aire es calido";
        estadoTemperatura="Activo";
        io.emit('temperatura:data',{
            value: v_temperatura
        });
    }else if (v_temperatura <= 20 ){
        descripcionTemperatura = "El aire es frio";
        estadoTemperatura="Activo";
        io.emit('temperatura:data',{
            value: v_temperatura
        });
    }

    // Creamos la consulta SQL, para enviar los datos a la base de datos MySQL
    const sqlTemperatura = `INSERT INTO registroTemperatura SET ?`;
    const sensorTemperaturaObject = {
        idSensorT: idSensorTemperatura,
        porcentajeT: v_temperatura,
        estadoT: estadoTemperatura,
        descripcionT: descripcionTemperatura
    };
    // Ejecutamos el query y capturamos errores
    connection.query(sqlTemperatura, sensorTemperaturaObject, err => {
        if (err) throw err;
        console.log("Registro de temperatura guardado");
    });
    

    // Validaciones y condicionales para el sensor de lluvia
    if (v_lluvia < 300){ 
        descripcionLluvia = "¡Está lloviendo fuerte!";
        porcentajeLluvia = 100;
        estadoLluvia="Lloviendo";

    } else if (v_lluvia < 500){ 
        descripcionLluvia = "La lluvia es moderada";
        porcentajeLluvia = 50;
        estadoLluvia="Lloviendo";
    }else{
        descripcionLluvia = "No se ha detectado lluvia";
        porcentajeLluvia = 0;
        estadoLluvia= "No está lloviendo";
    }

    // Creamos la consulta SQL, la cual hará un update cada vez que lleguen datos al puerto serial, enviando así N variables y actualizando N datos de la base de datos
    const sqlLluvia = `UPDATE sensorL SET porcentajeL = '${porcentajeLluvia}', estadoL = '${estadoLluvia}' , descripcionL = '${descripcionLluvia}'
    WHERE idL = ${idL}`
    /* ejecutamos la consulta, capturamos los errores y damos un mensaje cuando los datos se guarden en la base de datos */
    connection.query(sqlLluvia, err => {
        if (err) throw err;
            console.log("Estado de lluvia actualizado");
        });
    
    
});

// Si se llega a ocasionar un error en el stream, se mostrará por consola 
port.on('error', (err)=>{
    console.log(err);
});

// Con el metodo "listen", modificamos o añadimos el puerto por el cual el servidor estará ejecutandose
server.listen(3000, ()=>{
    console.log('Servidor en el puerto: ', 3000);
});