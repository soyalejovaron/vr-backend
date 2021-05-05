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

//Route
app.get('/', (req, res) => {
    res.send("Welcome")
});

/*-------------------Estados-------------------------*/

app.get('/estados', (req, res) => {
    const sql = 'SELECT * FROM estados';
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

app.get('/plantas', (req, res) => {
    const sql = 'SELECT * FROM plantas';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.get('/plantas/:id_planta', (req, res) => {
    const { id_planta } = req.params;
    const sql = `SELECT * FROM plantas WHERE id_planta = ${id_planta}`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.post('/addPlanta', (req, res) => {
    const sql = `INSERT INTO plantas SET ?`;
    const plantaObject = {
        nombre_planta: req.body.nombre_planta,
        descripcion_planta: req.body.descripcion_planta
    };

    connection.query(sql, plantaObject, err => {
        if (err) throw err;
        res.json({message: 'Planta Creada!'});
    });
});

app.put('/updatePlanta/:id_planta', (req, res) => {
    const { id_planta } = req.params;
    const {nombre_planta, descripcion_planta} = req.body;
    const sql = `UPDATE plantas SET nombre_planta = '${nombre_planta}' , descripcion_planta = '${descripcion_planta}'
     WHERE id_planta = ${id_planta}`

     connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Planta Actualizada'});
    });

});

app.delete('/deletePlanta/:id_planta', (req, res) => {
    const { id_planta } = req.params;
    const sql = `DELETE FROM plantas WHERE id_planta = ${id_planta}`
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Planta borrada!'});
    });
});



/* --------------------Sensor Humedad-------------------- */
app.get('/sensores', (req, res) => {
    const sql = 'SELECT * FROM sensorH';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.get('/sensores/:idSensor', (req, res) => {
    const { idSensor } = req.params;
    const sql = `SELECT * FROM sensorH WHERE idSensorH = ${idSensor}`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.post('/addSensor', (req, res) => {
    const sql = `INSERT INTO sensorH SET ?`;
    const sensorObject = {
        tipoSensorH: req.body.tipoSensor,
        nombreSensorH: req.body.nombreSensor,
        colorSensorH: req.body.colorSensor,
        id_planta: req.body.plantaSensor,  
        fechaCreacionH: new Date(),  
    };

    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        res.json({message: 'Sensor de humedad Creado!'});
    });
});

app.put('/updateSensor/:idSensor', (req, res) => {
    const { idSensor } = req.params;
    const {tipoSensor, nombreSensor, colorSensor, plantaSensor} = req.body;
    const sql = `UPDATE sensorH SET tipoSensorH = '${tipoSensor}' , nombreSensorH = '${nombreSensor}' , colorSensorH = '${colorSensor}',
     id_planta = '${plantaSensor}' WHERE idSensorH = ${idSensor}`

     connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de humedad Actualizado'});
    });

});

app.delete('/deleteSensor/:idSensor', (req, res) => {
    const { idSensor } = req.params;
    const sql = `DELETE FROM sensorH WHERE idSensorH = ${idSensor}`
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de humedad Borrado'});
    });
});

/* --------------------Sensor Temperatura-------------------- */



app.get('/sensoresT', (req, res) => {
    const sql = 'SELECT * FROM sensorT';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.get('/sensoresT/:idSensor', (req, res) => {
    const { idSensor } = req.params;
    const sql = `SELECT * FROM sensorT WHERE idSensorT = ${idSensor}`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.post('/addSensorT', (req, res) => {
    const sql = `INSERT INTO sensorT SET ?`;
    const sensorObject = {
        tipoSensorT: req.body.tipoSensor,
        nombreSensorT: req.body.nombreSensor,
        colorSensorT: req.body.colorSensor,
        id_estado: req.body.estadoSensor,
        id_planta: req.body.plantaSensor,  
    };

    connection.query(sql, sensorObject, err => {
        if (err) throw err;
        res.json({message: 'Sensor de temperatura Creado!'});
    });
});

app.put('/updateSensorT/:idSensor', (req, res) => {
    const { idSensor } = req.params;
    const {tipoSensor, nombreSensor, colorSensor, plantaSensor, estadoSensor} = req.body;
    const sql = `UPDATE sensorT SET tipoSensorT = '${tipoSensor}' , nombreSensorT = '${nombreSensor}' , colorSensorT = '${colorSensor}',
     id_planta = '${plantaSensor}', id_estado = '${estadoSensor}' WHERE idSensorT = ${idSensor}`

     connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de temperatura actualizado'});
    });

});

app.delete('/deleteSensorT/:idSensor', (req, res) => {
    const { idSensor } = req.params;
    const sql = `DELETE FROM sensorT WHERE idSensorT = ${idSensor}`
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Sensor de temperatura borrado'});
    });
});




//CHECK connect 
connection.connect(error => {
    if (error) throw err;
    console.log('Base de datos conectada');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});