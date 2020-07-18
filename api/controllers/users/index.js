const getAll = (req, res) => {
    res.send('Users List');
}

const getByID = (req, res) => {
    res.send('User Page');
}

const create = (req, res) => {
    res.send('Create User');
}

const update = (req, res) => {
    res.send('Update User');
}

const remove = (req, res) => {
    res.send('Delete User');
}

module.exports = { getAll, getByID, create, update, remove };