// Importar Espress
const express = require('express');
//Instanciar Express en el objeto app
const app = express();

//Importar módulo personalizado
const validador = require('./validador');


//Modelos
const users = [];
//middlewares
app.use(express.json());


app.post('/users',  (req, res) => {
    
    const identification =req.body.identification;
    const name =req.body.name;
    const lastname =req.body.lastname;
    const age =req.body.age;
    const gender =req.body.gender;
    const height =req.body.height;
    const weight =req.body.weight;
    const telephones =req.body.telephones;
    //let sw = false;
    
    if(!validador("number",identification))  {
        res.status(400).send(`El dato  ${identification} debe ser number`);
        return;
    }
    
    if(!validador("string",name))  {
        res.status(400).send(`El dato  ${name} debe ser string`);
        return;
    }
    
    if(!validador("string",lastname))  {
        res.status(400).send(`El dato  ${lastname} debe ser string`);
        return;
    }
    
    if(!validador("number",age))  {
        res.status(400).send(`El dato  ${age} debe ser number`);
        return;
    }
    
    if(!"F" === gender ||  !"M" === gender)  {
        res.status(400).send(`El dato  ${gender} debe ser \"F\" o \"M\"`);
        return;
    }
    
    if(!(validador("undefined",height) || validador("number",height)))  {
        res.status(400).send(`El dato  ${height} debe ser number`);
        return;
    }
    
    if(!(validador("undefined",weight) || validador("number",weight) )){
        res.status(400).send(`El dato  ${weight} debe ser number`);
        return;
    }

    if(!(validador("undefined",telephones) || validador("object",telephones))){
        res.status(400).send(`El dato  ${telephones} debe ser array`);
        return;
    }

    //if(!sw){
        const user = {
            identification:identification,
            name:name,
            lastname: lastname,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            telephones: telephones
        };
        users.push(user);
        res.status(200).send(`El usuario ${user.name} fue agregado correctamente.`)
    //}
});

app.get('/users', (req, res) =>{
    res.status(200).send(users);
});

app.listen(3000, () =>{ 
    console.log("Servidor Iniciado");
});