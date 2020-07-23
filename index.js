// Importar Espress
const express = require('express');
//Instanciar Express en el objeto app
const app = express();

//Importar módulo personalizado
const mongoose = require('mongoose');
const logger = require('./api/middlewares/logger');
const api = require('./api');

//Modelos
const loggerMiddleware = (req, _, next) => {
    next();
    console.log(logger(req));
}

//middlewares
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', api);

app.get('*', (_, res) => {
    res.send('URL inválida.');
});

mongoose.connect('mongodb://localhost/twitter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to DB');
})

app.listen(3000, () => {
    console.log("Servidor Iniciado");
});