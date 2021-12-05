const mongoose = require('mongoose')

const totalCountSchema = new mongoose.Schema({

    name: String,
    count: Number,

})

const TotalCountModel = mongoose.model('totalVisitCount', totalCountSchema)

module.exports = TotalCountModel
