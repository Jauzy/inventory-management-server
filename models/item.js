const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input name']
    },
    available: {
        type: Boolean,
        required: [true, 'Please specify availability']
    },
    input_by: {
        type: Schema.Types.ObjectId, ref: 'Admin',
        required: [true, 'Please provide admin']
    },
})

//User sebagai nama collection mongoose
module.exports = mongoose.model("Item", ItemSchema)