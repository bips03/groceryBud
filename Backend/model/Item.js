const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema( {
    name : {
        type : String,
        required : true
    },
    qty : {
        type : String,
        required : true
    },
    done : {
        type : Boolean,
        required : true,
        default : false
    }
})

module.exports = mongoose.model('Item', itemSchema)