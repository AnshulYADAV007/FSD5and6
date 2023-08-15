require('./crons/cron')
const dbConfig = require('./configs/db.config')
const mongoose = require('mongoose')
const express = require('express')
const ticketNotificationModel = require('./models/ticketNotification.model')

const app = express()
app.use(express.json())

mongoose.connect(
  dbConfig.DB_URL,
  () => {
    console.log('Connected to Mongo DB')
  },
  (err) => {
    console.log('Error: ', err.message)
  }
)

require('./routes/ticketNotification.route')(app)
ticketNotificationModel.collection.drop()
app.listen(3030, () => {
  console.log('Application started on the port num 3030')
})
