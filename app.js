
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
    database: 'GRAFICAS'
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

/* ----------------------CATEGORIAS-------------------- */

app.get('/categorias', (req, res) => {
    const sql = 'SELECT * FROM GRAF_CATEGORIA';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.get('/categorias/:idCategoria', (req, res) => {
    const { idCategoria } = req.params;
    const sql = `SELECT * FROM GRAF_CATEGORIA WHERE PK_CATE = ${idCategoria}`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'No hay resultados'});
        }
    });
});

app.post('/addCategoria', (req, res) => {
    const sql = `INSERT INTO GRAF_CATEGORIA SET ?`;
    const categoriaObject = {
        NOMBRE_CATE: req.body.nombreCategoria,
        COLOR_CATE: req.body.colorCategoria,
        DATOS_CATE: req.body.datosCategoria
    };

    connection.query(sql, categoriaObject, err => {
        if (err) throw err;
        res.json({message: 'Categoria Creada'});
    });
});

app.put('/updateCategoria/:idCategoria', (req, res) => {
    const { idCategoria } = req.params;
    const {nombreCategoria, colorCategoria, datosCategoria} = req.body;
    const sql = `UPDATE GRAF_CATEGORIA SET NOMBRE_CATE = '${nombreCategoria}' , COLOR_CATE = '${colorCategoria}', DATOS_CATE = '${datosCategoria}'
     WHERE PK_CATE = ${idCategoria}`

     connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Categoria Actualizada'});
    });

});

app.delete('/deleteCategoria/:idCategoria', (req, res) => {
    const { idCategoria } = req.params;
    const sql = `DELETE FROM GRAF_CATEGORIA WHERE PK_CATE = ${idCategoria}`
    connection.query(sql, err => {
        if (err) throw err;
        res.json({message: 'Categoria Borrada'});
    });
});


//CHECK connect 
connection.connect(error => {
    if (error) throw err;
    console.log('Database server running');
});

app.listen(PORT, () => {
    console.log(`Server running on port  ${PORT}`);
});