module.exports = (app) => {
    require('./user.route')(app)
    require('./admin.route')(app)
}