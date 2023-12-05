module.exports = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const handledError = err.statusCode < 500;
    res.status(status).json(
        handledError ? {
            message: err.message,
            errors: err.errors
        } : {
            message: 'something went wrong'
        }
    )
}