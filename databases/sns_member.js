const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snsmember = new Schema({
    type: {type: String, required: true },
    id: {type: String, required: true, unique: true },
    email: {type: String, required: true },
    name: {type: String, required: true },
    basket: [{type: String, required: false }],
    admin: {type: Boolean, default: false }
})

snsmember.methods.assignAdmin = () => {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('snsmember', snsmember)