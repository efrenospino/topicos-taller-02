const User = require('./../../models/users');
const Tweet = require('./../../models/tweets');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('./../../functions/crypto');
const config = require('./../../../config');

const getAll = (_, res) => {
    User.find({}, ['username', 'name'])
        .then((r) => res.send(r))
        .catch((_) => res.sendStatus(500));
}

const getByID = (req, res) => {
    User.findOne({ _id: req.params.id }, ['name', 'username', 'birthdate'])
        .then((r) => {
            const user = {
                name: r.name,
                username: r.username,
                birthdate: crypto.decrypt(r.birthdate)
            }
            res.send(user)
        })
        .catch(() => res.sendStatus(500));
}

const create = (req, res) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(req.body.password, salt);
    const birthdate = crypto.encrypt(req.body.birthdate);
    const user = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: password,
        email: req.body.email,
        telephone: req.body.telephone,
        birthdate: birthdate
    };
    if (user.name && user.password && user.age && user.username && user.email) {
        const object = new User(user);
        object.save()
            .then((response) => {
                res.status(201).send(`^El usuario fue creado con Id: ${response._id}`);
            })
            .catch((err) => {
                send.sendStatus(500);
            })
    } else {
        send.sendStatus(500);
    }
}

const loginUser = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({ username: user.username }, ["name", "password"])
        .then(response => {
            const password = response.password;
            if (bcrypt.compareSync(user.password, password)) {
                const token = jwt.sign({ id: response._id }, config.tokenKey);
                res.status(200).json({ token: token, name: response.name, id: response._id });
            } else
                res.sendStatus(400)
        })
        .catch(err => {
            res.sendStatus(400);
        });
};

const update = (req, res) => {
    User.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                age: req.body.age,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                telephones: req.body.telephones
            }
        })
        .save()
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const remove = (req, res) => {
    User.remove({ _id: req.body.id })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
}

const getUserTweets = (req, res) => {
    Tweet.find({ user: req.params.id })
        .populate('user', ['username', 'name'])
        .populate('comments.user', ['username', 'name'])
        .then((r) => res.send(r))
        .catch((_) => res.sendStatus(500));
}

const getCountTweets = (req, res) => {


    Tweet.find({ user: req.body.id })
        .then((r) => res.send(r.length.toString()))
        .catch((_) => res.sendStatus(404));


}

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
    getCountTweets,
    getUserTweets,
    loginUser
};