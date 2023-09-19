const {authenticateToken} = require("../middleware/auth.middleware");
module.exports = (app) => {
    const users = require('../controllers/user.controller')
    const router = require('express').Router()

    router.get('', users.findAll)
    router.post('', users.create)
    router.get('/account/:accountNumber', users.findByAccountNumber)
    router.get('/identity/:identityNumber', users.findByIdentityNumber)
    router.put('', users.update)
    router.delete('/:id', users.deleteById)

    app.use('/api/v1/users', authenticateToken ,router)
}