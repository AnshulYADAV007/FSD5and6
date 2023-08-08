

const express = require('express');
const bodyParser = require('body-parser')
const serverConfig = require('./Configs/server.config')
const dbConfig = require('./Configs/db.config')
const mongoose = require('mongoose')


const expressApp = express();

expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection
db.on("error", () => {
    console.log("Error while connecting to DB")
})
db.once("open", () => {
    console.log("Successfully Connected to mongo DB")
})


require('./Routers/Movie.route')(expressApp);
require("./Routers/Theatre.route")(expressApp);
require("./Routers/Auth.route")(expressApp);
require("./Routers/User.route")(expressApp);
require("./Routers/Booking.route")(expressApp);

expressApp.listen(serverConfig.PORT, () => {
    console.log(`Application started on port ${serverConfig.PORT}`)
})
