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
    const newTweet = {
        content: req.body.content,
        user: req.body.user
    }
    new Tweet(newTweet)
        .save()
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(400));
}

const update = (req, res) => {
    Tweet.updateOne({ _id: req.params.id }, {
            $set: { content: req.body.content }
        })
        .then((r) => res.send(r))
        .catch(() => res.sendStatus(500));
}

const remove = (req, res) => {
    Tweet.remove({ _id: req.params.id })
        .then(() => res.sendStatus(200))
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

module.exports = { getAll, getByID, create, update, remove, newComment };