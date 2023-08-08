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
  const user1 = await Users.create({
    name: 'Anshul',
    userId: 'admin',
    email: 'anshul@gmail.com',
    userType: 'ADMIN',
    password: bcrypt.hashSync('Welcome', 8),
  })
  const user2 = await Users.create({
    name: 'Kiran',
    userId: 'customer',
    email: 'kiran@gmail.com',
    userType: 'CUSTOMER',
    password: bcrypt.hashSync('Welcome', 8),
  })
  await Movies.collection.drop()
  const movie = await Movies.create({
    name: 'Radhe Shyam',
    description: 'Comedy Drama Movie',
    casts: ['Prabhas', 'Pooja Hegde'],
    director: 'Radha Krishna Kumar',
    trailerUrl: 'http://RadhaShyam/trailers/1',
    posterUrl: 'http://radhaShyam/posters/1',
    language: 'Hindi',
    releaseDate: '11-02-2022',
    releaseStatus: 'RELEASED',
  })
  console.log('Two users created successfully')
}

require('./Routers/Movie.route')(expressApp)
require('./Routers/Theatre.route')(expressApp)
require('./Routers/Auth.route')(expressApp)
require('./Routers/User.route')(expressApp)
require('./Routers/Booking.route')(expressApp)

expressApp.listen(serverConfig.PORT, () => {
  console.log(`Application started on port ${serverConfig.PORT}`)
})
