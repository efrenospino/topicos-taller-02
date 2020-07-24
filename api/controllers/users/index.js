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
    const user = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephones: req.body.telephones
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




module.exports = { getAll, getByID, create, update, remove, getCountTweets, getUserTweets };