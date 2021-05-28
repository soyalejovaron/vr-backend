/* Nota: Recuerda que las constantes son un espacio de almacenamiento que se guarda para una información especifica,
ademas, una vez se define esta constante, su valor no puede cambiar en el tiempo */ 

/* Creamos una constante donde requerimos el modulo de express para la creación del servidor */
const express = require('express');

/* Creamos una constante donde requerimos la libreria y driver de conexión de MySQL, para comunicarnos con la base de datos */
const mysql = require('mysql');

// Creamos una constante donde requeriremos body-parser, la cual nos ayudará a acceder al cuerpo de las peticiones que se hagan de N clientes, en este caso, angular
const bodyParser = require('body-parser');

/* Creamos una constante donde guardaremos el puerto por el cual correrá el servidor de express */
const PORT = process.env.PORT || 3050;

/* Creamos una constante con N nombre, donde almacenamos el servidor de express */
const app = express();


/* Creamos una constante para almacenar y crear la conexión donde construiremos su configuración necesaria para acceder al servidor y base de datos de MySQL
para eso, usamos el metodo "createConnection", indicando a su vez la librería de MySQL*/
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'viveregistro'
});
// Hacemos uso del body-parser 
app.use(bodyParser.json());

// Usamos el metodo "use", para configurar las cabeceras y los CORS del servidor, donde indicaremos los permisos, peticiones, formatos, las cuales permitiran al servidor de express comunicarse con otros servidores sin problemas */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/* Empezaremos a crear APIS rest: estas, son una serie de metodos funcionales, los cuales en este caso, se encargaran de ejecutar las consultas SQL de MySQL,
donde habrán dos parametros fundamentales, el req y el res. El primero nos servirá para requerir datos de angular y así enviarlos a MySQL, ademas,
le daremos una respuesta al usuario, donde dependiendo de lo que se requiera, se dará una respuesta diferente, puede ser un mensaje o una serie de datos que el usuario
no verá pero que el fronted usará para mostrarlos o hacer multiples operaciones o validaciones. */

/* Creamos la ruta o API principal, la cual le dará la bienvenida al usuario */
app.get('/', (req, res) => {
    res.send("Bienvenido")
});

/*------------------Registro del sensor de humedad-----------------*/

/*Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer todos los registros de la tabla "registrosHumedad"*/
app.get('/registrosHumedad', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = 'SELECT * FROM registroHumedad';
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/*--------------------Traer el ultimo registro del sensor de humedad------------------- */

/*Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer el ultimo registro de la tabla "registrosHumedad"*/
app.get('/registroHumedad', (req, res) => {

    // Consulta especial, la cual nos traerá el ultimo registro, o sea, el más reciente de N tabla
    const sql = 'SELECT * FROM registroHumedad ORDER BY idH DESC limit 1';
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/*------------------Registros del sensor de temperatura------------*/

/* Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer todos los registros de la tabla "registrosTemperatura"*/
app.get('/registrosTemperatura', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = 'SELECT * FROM registroTemperatura';
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/*--------------------Traer el ultimo registro del sensor de temperatura------------------- */

/* Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer el ultimo registro de la tabla "registrosHumedad"*/
app.get('/registroTemperatura', (req, res) => {

    // Consulta especial, la cual nos traerá el ultimo registro, o sea, el más reciente de N tabla
    const sql = 'SELECT * FROM registroTemperatura ORDER BY idT DESC limit 1';
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/*-------------------Registros del sensor de lluvia------------------- */

/* Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer todos los registros de la tabla "registroLluvia"*/
app.get('/registroLluvia', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = 'SELECT * FROM sensorL ORDER BY idL DESC limit 1';
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/* -------------------Plantas-------------------------*/

/* Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer todos los registros de la tabla "plantas"*/
app.get('/plantas', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = 'SELECT * FROM plantas';
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/* Creamos una API rest, la cual ejecutará una petición "GET", ademas, por medio de la URL, recibirá un id, el cual usará para identificar N planta que se encuentre en la base de datos, y así, traer todos sus respectivos datos */
app.get('/plantas/:id_planta', (req, res) => {

    // Constante que guardará el id de N planta (proporcionado por un servidor cliente)
    const { id_planta } = req.params;

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `SELECT * FROM plantas WHERE id_planta = ${id_planta}`;
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

// Creamos una API rest, la cual ejecutará una petición "POST". Esta api requerirá una serie de variables que contendrán diferentes tipos de datos, las cuales se usaran para crear una nueva planta en MySQL (para esto, se usará una consulta SQL) */ 
app.post('/addPlanta', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `INSERT INTO plantas SET ?`;
    // Constante en la cual almacenaremos múltiples variables que, requeriremos de un servidor cliente para poder crear una nueva planta
    const plantaObject = {
        nombre_planta: req.body.nombre_planta,
        descripcion_planta: req.body.descripcion_planta
    };
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, plantaObject, err => {
        if (err) throw err;
        res.json({message: 'Planta Creada!'});
    });
});

// Creamos una API rest, la cual ejecutará una petición "PUT". Esta api requerirá una serie de variables que contendrán diferentes tipos de datos, las cuales se usaran para reemplazar y actualizar los datos de N planta en MySQL (para esto, se usará una consulta SQL) */ 
app.put('/updatePlanta/:id_planta', (req, res) => {

    // Constante que guardará el id de N planta (proporcionado por un servidor cliente)
    const { id_planta } = req.params;
    // Constante en la cual almacenaremos múltiples variables que, requeriremos de un servidor cliente, las cuales se usaran para actualizar N planta
    const {nombre_planta, descripcion_planta} = req.body;

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `UPDATE plantas SET nombre_planta = '${nombre_planta}' , descripcion_planta = '${descripcion_planta}'
     WHERE id_planta = ${id_planta}`;
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Planta Actualizada'});
    });

});

/* Creamos una API rest, la cual ejecutará una petición "DELETE", ademas, por medio de la URL, se recibirá un id de N planta, con el cual se podrá eliminar dicha planta correspondiente a ese id (para esto, se usará una consulta SQL)*/
app.delete('/deletePlanta/:id_planta', (req, res) => {

    // Constante que guardará el id de N planta (proporcionado por un servidor cliente)
    const { id_planta } = req.params;

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `DELETE FROM plantas WHERE id_planta = ${id_planta}`;
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Planta borrada!'});
    });
});



/* --------------------Sensor de Humedad-------------------- */

/*Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer todos los registros de la tabla "sensorH"*/
app.get('/sensores', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = 'SELECT * FROM sensorH';
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/* Creamos una API rest, la cual ejecutará una petición "GET", ademas, por medio de la URL, recibirá un id, el cual usará para identificar N sensor de humedad que se encuentre en la base de datos, y así, traer todos sus respectivos datos */
app.get('/sensores/:idSensor', (req, res) => {

    // Constante que guardará el id de N sensor de humedad (proporcionado por un servidor cliente)
    const { idSensor } = req.params;

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `SELECT * FROM sensorH WHERE idSensorH = ${idSensor}`;
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

// Creamos una API rest, la cual ejecutará una petición "POST". Esta api requerirá una serie de variables que contendrán diferentes tipos de datos, las cuales se usaran para crear un nuevo sensor de humedad en MySQL (para esto, se usará una consulta SQL) */ 
app.post('/addSensor', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `INSERT INTO sensorH SET ?`;
    // Constante en la cual almacenaremos múltiples variables que, requeriremos de un servidor cliente para crear un nuevo sensor de humedad
    const sensorObject = {
        tipoSensorH: req.body.tipoSensor,
        nombreSensorH: req.body.nombreSensor,
        colorSensorH: req.body.colorSensor, 
        plantaSensorH: req.body.plantaSensor,    
    };
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        res.json({message: 'Sensor de humedad Creado!'});
    });
});

// Creamos una API rest, la cual ejecutará una petición "PUT". Esta api requerirá una serie de variables que contendrán diferentes tipos de datos, las cuales se usaran para reemplazar y actualizar los datos de N sensor de humedad en MySQL (para esto, se usará una consulta SQL) */ 
app.put('/updateSensor/:idSensor', (req, res) => {

    // Constante que guardará el id de N sensor de humedad (proporcionado por un servidor cliente)
    const { idSensor } = req.params;
    // Constante en la cual almacenaremos múltiples variables que requeriremos de un servidor cliente, las cuales se usaran para actualizar N sensor de humedad
    const {tipoSensor, nombreSensor, colorSensor, plantaSensor} = req.body;

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `UPDATE sensorH SET tipoSensorH = '${tipoSensor}' , nombreSensorH = '${nombreSensor}' , colorSensorH = '${colorSensor}',
     plantaSensorH = '${plantaSensor}' WHERE idSensorH = ${idSensor}`
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de humedad Actualizado'});
    });

});

/* Creamos una API rest, la cual ejecutará una petición "DELETE", ademas, por medio de la URL, se recibirá un id de N sensor de humedad, con el cual se podrá eliminar dicho sensor correspondiente a ese id (para esto, se usará una consulta SQL)*/
app.delete('/deleteSensor/:idSensor', (req, res) => {

    // Constante que guardará el id de N sensor de humedad (proporcionado por un servidor cliente)
    const { idSensor } = req.params;

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `DELETE FROM sensorH WHERE idSensorH = ${idSensor}`
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de humedad Borrado'});
    });
});

/* --------------------Sensor de Temperatura-------------------- */

/*Creamos una API rest, la cual recibira una petición "GET", esta, nos servirá para traer todos los registros de la tabla "sensorT"*/
app.get('/sensoresT', (req, res) => {

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = 'SELECT * FROM sensorT';
    
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, tambien podremos capturar todo tipo de errores que puedan presentarse en la ejecución de la misma
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

/* Creamos una API rest, la cual ejecutará una petición "GET", ademas, por medio de la URL, recibirá un id, el cual usará para identificar N sensor de temperatura que se encuentre en la base de datos, y así, traer todos sus respectivos datos */
app.get('/sensoresT/:idSensor', (req, res) => {

    // Constante que guardará el id de N sensor de temperatura (proporcionado por un servidor cliente)
    const { idSensor } = req.params;
    
    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `SELECT * FROM sensorT WHERE idSensorT = ${idSensor}`;
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, a capturar todo tipo de error que pueda presentarse en este proceso
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

// Creamos una API rest, la cual ejecutará una petición "POST". Esta api requerirá una serie de variables que contendrán diferentes tipos de datos, las cuales se usaran para crear un nuevo sensor de temperatura en MySQL (para esto, se usará una consulta SQL) */ 
app.post('/addSensorT', (req, res) => {
    
    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `INSERT INTO sensorT SET ?`;
    // Constante en la cual almacenaremos múltiples variables que, requeriremos de un servidor cliente para crear un nuevo sensor de temperatura */
    const sensorObject = {
        tipoSensorT: req.body.tipoSensor,
        nombreSensorT: req.body.nombreSensor,
        colorSensorT: req.body.colorSensor,
        plantaSensorT: req.body.plantaSensor,  
    };
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, a capturar todo tipo de error que pueda presentarse en este proceso
    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        res.json({message: 'Sensor de temperatura Creado!'});
    });
});

// Creamos una API rest, la cual ejecutará una petición "PUT". Esta api requerirá una serie de variables que contendrán diferentes tipos de datos, las cuales se usaran para reemplazar y actualizar los datos de N sensor de temperatura en MySQL (para esto, se usará una consulta SQL) */ 
app.put('/updateSensorT/:idSensor', (req, res) => {

    // Constante que guardará el id de N sensor de temperatura (proporcionado por un servidor cliente)
    const { idSensor } = req.params;
        // Constante en la cual almacenaremos múltiples variables que requeriremos de un servidor cliente, las cuales se usaran para actualizar N sensor de temperatura
    const {tipoSensor, nombreSensor, colorSensor, plantaSensor} = req.body;

    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `UPDATE sensorT SET tipoSensorT = '${tipoSensor}' , nombreSensorT = '${nombreSensor}' , colorSensorT = '${colorSensor}', 
     plantaSensorT = '${plantaSensor}' WHERE idSensorT = ${idSensor}`
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, a capturar todo tipo de error que pueda presentarse en este proceso
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de temperatura actualizado'});
    });

});

/* Creamos una API rest, la cual ejecutará una petición "DELETE", ademas, por medio de la URL, se recibirá un id de N sensor de temperatura, con el cual se podrá eliminar dicho sensor correspondiente a ese id (para esto, se usará una consulta SQL)*/
app.delete('/deleteSensorT/:idSensor', (req, res) => {

    // Constante que guardará el id de N sensor de temperatura (proporcionado por un servidor cliente)
    const { idSensor } = req.params;
    
    // Constante en la cual, guardaremos la consulta SQL que se ejecutará en esta API rest
    const sql = `DELETE FROM sensorT WHERE idSensorT = ${idSensor}`
    // Usamos el metodo "query", el cual nos ayudará a ejecutar la consulta SQL, ademas, a capturar todo tipo de error que pueda presentarse en este proceso
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de temperatura borrado'});
    });
});

    

// Verificamos la conexión a MySQL con el metodo "connect", en caso de ser exitosa, mandamos un mensaje 
connection.connect(error => {
    if (error) throw err;
    console.log('Base de datos conectada');
});

// Configuración del puerto donde se ejecutará el servidor de express
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});