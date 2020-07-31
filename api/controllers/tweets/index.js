const Tweet = require('./../../models/tweets');

const getAll = (_, res) => {
    Tweet.find()
        .populate('user', ['username', 'name'])
        .populate('comments.user', ['username', 'name'])
        .then((r) => res.send(r))
        .catch((_) => res.sendStatus(500));
}

const getByID = (req, res) => {
    Tweet.findOne({ _id: req.params.id })
        .populate('user', ['username', 'name'])
        .populate('comments.user', ['username', 'name'])
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const create = (req, res) => {
    const tweet = {
        content: req.body.content,
        user: req.userId
    };
    if (tweet.content && tweet.user) {
        const object = new Tweet(tweet);
        object.save()
            .then((response) => {
                res.status(201).send(`El content fue creado con Id: ${response._id}`);
            })
            .catch((err) => {
                send.sendStatus(500);
            })
    } else {
        send.sendStatus(500);
    }
}

const update = (req, res) => {
    Tweet.updateOne({ _id: req.params.id }, {
            $set: { content: req.body.content }
        })
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const remove = (req, res) => {
    

    Tweet.exists({
        _id: id,
        user: req.userId,
    }).then(existTweet=> {
        if (existTweet) {
            Tweet.remove({ _id: req.body.id })
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500));
        } else {
            res.status(400).send("Acceso Denegato a Peticion.");
        }
    })
    .catch(() => res.sendStatus(500));
}

const newComment = (req, res) => {
    Tweet.updateOne({ _id: req.params.id }, {
            $addToSet: {
                comments: {
                    comment: req.body.comment,
                    user: req.body.user
                }
            }
        })
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const removeComment = (req, res) => {
    Tweet.updateOne({ _id: req.params.id }, {
            $pull: {
                comments: {
                    _id: req.body.commentID
                }
            }
        })
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const getLastNTweets = (req, res) => {
    Tweet.find()
        .limit(Number(req.params.count))
        .sort({ createdAt: -1 })
        .populate('user', ['username', 'name'])
        .populate('comments.user', ['username', 'name'])
        .then((r) => res.send(r))
        .catch((_) => res.sendStatus(500));
}

const getCommentsCount = (req, res) => {
    Tweet.aggregate()
        .match({ _id: require('mongoose').Types.ObjectId(req.params.id) })
        .project({ numberOfComments: { $size: '$comments' } })
        .then((r) => res.send(r[0]))
        .catch(() => res.sendStatus(500));
}

const getTopNTweet = (req, res) => {

    Tweet.aggregate([
            { $group: { _id: { ID_usuario: "$user" }, Nro: { $sum: 1 } } },
            { $sort: { Nro: -1 } }
        ])
        .limit(Number(req.params.count))
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const getTopCommentedTweets = (req, res) => {
    Tweet.find()
        .limit(Number(req.params.count))
        .sort({ comments: -1 })
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
    newComment,
    removeComment,
    getLastNTweets,
    getCommentsCount,
    getTopNTweet,
    getTopCommentedTweets
};