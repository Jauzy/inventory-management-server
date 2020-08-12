require('dotenv').config()

const History = require('../models/history')
const Item = require('../models/item')

class HistoryController {
    static addNew(req, res) {
        if (req.user.type !== 'Organization') res.status(401).send({ message: 'not authorized!' })
        else {
            const { itemID } = req.body
            Item.findById(itemID).then(item => {
                if (!item) res.status(400).send({ message: 'item not found!' })
                else if (!item.available) res.status(400).send({ message: 'item has not available right now!' })
                else {
                    let history = new History({
                        item: itemID, organization: req.user.id,
                        borrow_date: new Date()
                    })
                    history.save()
                        .then(() => {
                            Item.findByIdAndUpdate(itemID, { available: false }).then(() => {
                                res.send({ message: 'new History Added' })
                            })
                        })
                        .catch(err => console.log(err))
                }
            })
        }
    }

    static returnItem(req, res) {
        if (req.user.type !== 'Admin') res.status(401).send({ message: 'not authorized!' })
        else {
            const { itemID } = req.body
            Item.findById(itemID).then(item => {
                if (!item) res.status(400).send({ message: 'item not found!' })
                else if (item.available) res.status(400).send({ message: 'item is available right now!' })
                else {
                    History.findOneAndUpdate({ item: itemID, returned_date: null }, { returned_date: new Date(), returned_to: req.user.id }).then(result => {
                        if (!result) res.status(400).send({ message: 'History not found!' })
                        else {
                            Item.findByIdAndUpdate(itemID, { available: true }).then(() => {
                                res.send({ message: 'Item Returned!' })
                            })
                        }
                    })
                }
            })
        }
    }

    static getAll(req, res) {
        History.find({}).populate('item organization returned_to').then(items => {
            res.send(items)
        })
    }

    static getOrgHistory(req, res) {
        History.find({ organization: req.user.id }).populate('item organization returned_to').then(items => {
            res.send(items)
        })
    }

    static getHistoriesCount(req, res) {
        History.find({}).then(histories => {
            res.send({ historyCount: histories.length })
        })
    }

}

module.exports = HistoryController