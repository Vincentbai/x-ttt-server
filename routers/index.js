const express = require('express')

const RankRecordModel = require('../models/RankRecordModel')
const TotalCountModel = require('../models/TotalCountModel')

const router = express.Router()

router.get('/totalCount', async (req, res) => {

  try {

    const doc = await TotalCountModel.findOneAndUpdate(
      {},
      {$inc: { count: 1 }},
      {new: true},
    )

    const count = doc.count * 1

    res.send({status: 200, data: count})
    
  } catch (error) {
    
    res.send({status: 500})

    console.log(error)
  }
})

router.post('/addOrUpdateRecord', async (req, res) => {

  try {

    const data = req.body

    data.name = data.name.toUpperCase()

    // check name and ip address first

    const existingUser = await RankRecordModel.findOne(data)

    if(!existingUser){
      console.log(data)
      const newRecord = await RankRecordModel.create([data])

      console.log(newRecord)
    }else{
      await RankRecordModel.findOneAndUpdate(data, {$inc:{login_count: 1}})
    }

    res.send({status: 200})
    
  } catch (err) {
    res.send({status: 500})
    console.log(err)
  }

})

router.post('/updateWinCount', async (req, res) => {

  try {

    const data = req.body

    data.name = data.name.toUpperCase()

    await RankRecordModel.findOneAndUpdate(data, {$inc:{win_count: 1}})

    res.send({status: 200})
    
  } catch (err) {
    res.send({status: 500})
    console.log(err)
  }

})

router.get('/getAllRecords', async (req, res) => {

  try {

    const data = req.body

    const recods = await RankRecordModel.find().sort({'win_count':-1, 'login_count':-1})

    res.send({status: 200,data: recods})
    
  } catch (err) {
    res.send({status: 500})
    console.log(err)
  }

})



module.exports = router