const mongoose = require('mongoose')

const RankRecordSchema = new mongoose.Schema({

    name: {type: String, required: true},
    country: {type: String, required: true},
    ip: {type: String, required: true},
    login_count: {type: Number, default: 1},
    win_count: {type: Number, default: 0},

})

const RankRecordModel = mongoose.model('ranks', RankRecordSchema)

module.exports = RankRecordModel
