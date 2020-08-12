const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const HistorySchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId, ref: 'Organization',
        required: [true, 'Please input organization']
    },
    item: {
        type: Schema.Types.ObjectId, ref: 'Item',
        required: [true, 'Please input item']
    },
    borrow_date: {
        type: Date,
        required: [true, 'Please input borrow date']
    },
    returned_date: {
        type: Date
    },
    returned_to: {
        type: Schema.Types.ObjectId, ref: 'Admin'
    }
})

//User sebagai nama collection mongoose
module.exports = mongoose.model("History", HistorySchema)