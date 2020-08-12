const mongoose = require('mongoose')
//cek unique di database
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

//bikin model schema database
const OrgSchema = new Schema({
    organization_name: {
        type: String,
        required: [true, 'Please input name']
    },
    email: {
        type: String,
        required: [true, "Please input email"]
    },
    password: {
        type: String,
        required: [true, "Please input password"]
    },
    phone: {
        type: String
    },
    type: {
        type: String
    }
})

//User sebagai nama collection mongoose
module.exports = mongoose.model("Organization", OrgSchema)