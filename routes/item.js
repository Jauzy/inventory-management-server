const route = require('express').Router()
const ItemController = require('../controllers/item')
const verifyToken = require('../middlewares/verifyToken')

route.get('/', ItemController.getAll)
route.post('/', verifyToken, ItemController.register)
route.put('/:itemID', verifyToken, ItemController.updateInfo)
route.delete('/:itemID', verifyToken, ItemController.deleteItem)

route.get('/count', ItemController.getItemsCount)

module.exports = route