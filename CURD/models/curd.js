var mongoose = require("mongoose")

var curdsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model("curd", curdsSchema)