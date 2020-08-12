require('dotenv').config()

const Item = require('../models/item')

class ItemController {
    static register(req, res) {
        if (req.user.type !== 'Admin') res.status(401).send({ message: 'Not Authorized!' })
        else {
            const { name } = req.body
            let item = new Item({
                name, input_by: req.user.id,
                available: true
            })
            item.save()
                .then(() => {
                    res.send({ message: 'new Item Added' })
                })
                .catch(err => console.log(err))
        }
    }

    static updateInfo(req, res) {
        if (req.user.type !== 'Admin') res.status(401).send({ message: 'Not Authorized!' })
        else {
            const { itemID } = req.params
            Item.findById(itemID).then(user => {
                if (!user) res.status(400).send({ message: 'Item not found!' })
                else {
                    const { input_by, ...approved } = req.body
                    Item.findByIdAndUpdate(itemID, { ...approved }).then(() => {
                        res.send({ message: 'Update info success!' })
                    })
                }
            })
        }
    }

    static deleteItem(req,res){
        if (req.user.type !== 'Admin') res.status(401).send({ message: 'Not Authorized!' })
        else {
            const { itemID } = req.params
            Item.findById(itemID).then(user => {
                if (!user) res.status(400).send({ message: 'Item not found!' })
                else {
                    Item.findByIdAndDelete(itemID).then(() => {
                        res.send({ message: 'Delete success!' })
                    })
                }
            })
        }
    }

    static getAll(req, res) {
        Item.find({}).populate('input_by').then(items => {
            res.send(items)
        })
    }

    static getItemsCount(req, res) {
        Item.find({}).then(items => {
            res.send({ itemCount: items.length })
        })
    }

}

module.exports = ItemController