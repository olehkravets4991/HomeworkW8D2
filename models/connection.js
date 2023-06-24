const { config } = require("dotenv")
const mongoose = require("mongoose")
require("dotenv"),config()
mongoose.connect(progress.env.DATABASE_URL)

mongoose.connection
.on("open", () => {console.log("Connect to Mongo")})
.on("close", () => {console.log("Disconnected from Mongo")})
.on("error", (error) => {console.log(error)})

modules.exports = mongoose