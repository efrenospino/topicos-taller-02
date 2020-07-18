// Importar Espress
const express = require('express');
//Instanciar Express en el objeto app
const app = express();

//Importar módulo personalizado
const mongoose = require('mongoose');
const validador = require('./api/functions/validador');
const logger = require('./api/middlewares/logger');
const bmi = require('./api/functions/bmi');
const api = require('./api');

//Modelos
const users = [];
const loggerMiddleware = (req, _, next) => {
    next();
    console.log(logger(req));
}

//middlewares
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', api);

app.post('/users', (req, res) => {

    const identification = req.body.identification;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;
    const telephones = req.body.telephones;

    if (!validador("number", identification)) {
        res.status(400).send(`El dato  ${identification} debe ser number`);
        return;
    }

    if (!validador("string", name)) {
        res.status(400).send(`El dato  ${name} debe ser string`);
        return;
    }

    if (!validador("string", lastname)) {
        res.status(400).send(`El dato  ${lastname} debe ser string`);
        return;
    }

    if (!validador("number", age)) {
        res.status(400).send(`El dato  ${age} debe ser number`);
        return;
    }

    if (!("F" === gender || "M" === gender)) {
        res.status(400).send(`El dato gender con valor ${gender} debe ser \"F\" o \"M\"`);
        return;
    }

    if (!(validador("undefined", height) || validador("number", height))) {
        res.status(400).send(`El dato  ${height} debe ser number`);
        return;
    }

    if (!(validador("undefined", weight) || validador("number", weight))) {
        res.status(400).send(`El dato  ${weight} debe ser number`);
        return;
    }

    if (!(validador("undefined", telephones) || validador("object", telephones))) {
        res.status(400).send(`El dato  ${telephones} debe ser array`);
        return;
    }

    const user = {
        identification: identification,
        name: name,
        lastname: lastname,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        telephones: telephones
    };
    users.push(user);
    res.status(200).send(`El usuario ${user.name} fue agregado correctamente.`);

});

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id([0-9])', (req, res) => {
    const user = users[req.params.id];
    if (user === undefined) {
        res.sendStatus(404)
        return;
    }
    res.status(200).send(user);
});

app.get('/users/lastname/:lastname', (req, res) => {
    const lastname = req.params.lastname;
    res.status(200).send(users.filter(r => r.lastname.toLowerCase() == lastname.toLowerCase()));
});

app.get('/users/gender/:gender', (req, res) => {
    const gender = req.params.gender.toUpperCase();
    res.status(200).send(users.filter(r => r.gender == gender));
});

app.get('/users/telephone', (req, res) => {
    res.status(200).send(users.filter(u => u.telephones != undefined && u.telephones.length > 0));
});

app.get('/users/bmi', (req, res) => {
    const usersWithHeightAndWeight = users.filter(u => u.height != undefined || u.weight != undefined)
    const bmiForUsers = usersWithHeightAndWeight.map(function(u) {
        return { user: `${u.name} ${u.lastname}`, bmi: bmi(u.weight, u.height) };
    });
    res.status(200).send(bmiForUsers);
});

app.get('/users/bmi/:id([0-9])', (req, res) => {

    const user = users[req.params.id];
    if (user === undefined) {
        res.sendStatus(404)
        return;
    }

    const calculatedBMI = bmi(user.weight, user.height);
    if (calculatedBMI === "Error") {
        res.status(400).send("Error");
        return;
    }

    res.status(200).send(`BMI for user is ${calculatedBMI}`);
});

app.delete('/users/:id([0-9])', (req, res) => {
    const id = req.params.id;
    users.splice(id, 1);
    res.status(200).send("Usuario Eliminado Correctamente");
});

app.get('*', (req, res) => {
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