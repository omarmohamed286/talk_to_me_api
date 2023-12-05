module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const err = new Error('Authorization required')
    err.statusCode = 401;
    if (!token) throw err;
    next()
}