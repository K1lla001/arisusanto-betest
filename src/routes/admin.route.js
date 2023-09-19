module.exports = (app) => {
    const admin = require('../controllers/admin.controller')
    const router = require('express').Router()


    router.post('/register', admin.register)
    router.post('/login', admin.login)

    app.use('/api/v1/auth', router)
}