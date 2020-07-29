// Importar Espress
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config();
const config = require('./config');

//Importar módulo personalizado
const api = require('./api');

const accessLogStream = fs.createWriteStream(path.join(`${__dirname}/${config.server.logs.dir}`, 'access.log'), { flags: 'a' });

//Instanciar Express en el objeto app
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/api', api);

app.get('*', (_, res) => {
    res.send('URL inválida.');
});

config.env === "development" &&
    mongoose.connect(
        `mongodb://${config.database.development.host}/${config.database.development.name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log("Conectado a la base de datos");
        }
    );
config.env === "production" &&
    mongoose.connect(
        `mongodb+srv://${config.database.production.user}:${config.database.production.password}@${config.database.production.host}/${config.database.development.name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log("Conectado a la base de datos");
        }
    );

const server = app.listen(
    config.server.port,
    config.server.host,
    () => {
        console.log(
            `Servidor iniciado en el puerto ${server.address().port} en modo ${
          config.env
        }`
        );
    }
);