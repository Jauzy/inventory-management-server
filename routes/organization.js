const route = require('express').Router()
const OrgController = require('../controllers/organization')
const verifyToken = require('../middlewares/verifyToken')

route.get('/', verifyToken, OrgController.getOrganizationData)
route.post('/', OrgController.register)
route.put('/', verifyToken, OrgController.updateInfo)
route.post('/login', OrgController.login)
route.put('/password', verifyToken, OrgController.changePassword)

route.get('/count', OrgController.getOrganizationsCount)

module.exports = route