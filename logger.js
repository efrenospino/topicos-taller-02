const logger = (req) => {
    return `${new Date()} : ${req.method} : ${req.path} : ${req.params} : ${req.get('User-Agent')}`;
}

module.exports = logger;