const User = require('./../../models/users');
const Tweet = require('./../../models/tweets');

const getAll = (_, res) => {
    User.find({}, ['username', 'name'])
        .then((r) => res.send(r))
        .catch((_) => res.sendStatus(500));
}

const getByID = (req, res) => {
    User.findOne({ _id: req.params.id }, ['name', 'age', 'username', 'email', 'telephones'])
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const create = (req, res) => {
    const newUser = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephones: req.body.telephones
    }
    new User(newUser)
        .save()
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(400));
}

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
    User.remove({ _id: req.params.id })
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

module.exports = { getAll, getByID, create, update, remove, getUserTweets };