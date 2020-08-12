const route = require('express').Router()
const AdminController = require('../controllers/admin')
const verifyToken = require('../middlewares/verifyToken')

route.get('/', verifyToken, AdminController.getAdminData)
route.post('/', AdminController.register)
route.put('/', verifyToken, AdminController.updateInfo)
route.post('/login', AdminController.login)
route.put('/password', verifyToken, AdminController.changePassword)

route.get('/count', AdminController.getAdminsCount)

module.exports = route