const express = require('express')
const bodyParser = require('body-parser')
const serverConfig = require('./Configs/server.config')
const dbConfig = require('./Configs/db.config')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Movies = require('./Models/Movies')
const Users = require('./Models/Users')

const expressApp = express()

expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection
db.on('error', () => {
  console.log('Error while connecting to DB')
})
db.once('open', () => {
  console.log('Successfully Connected to mongo DB')
  init()
})

/**
 * This function will initialize the state of the move booking database
 */
async function init() {
  await Users.collection.drop()
  const user = await Users.create({
    name: 'Anshul',
    userId: 'admin',
    email: 'anshul@gmail.com',
    userType: 'ADMIN',
    password: bcrypt.hashSync('Welcome', 8),
  })

  console.log('Admin user created successfully')
}

require('./Routers/Movie.route')(expressApp)
require('./Routers/Theatre.route')(expressApp)
require('./Routers/Auth.route')(expressApp)
require('./Routers/User.route')(expressApp)
require('./Routers/Booking.route')(expressApp)

expressApp.listen(serverConfig.PORT, () => {
  console.log(`Application started on port ${serverConfig.PORT}`)
})
