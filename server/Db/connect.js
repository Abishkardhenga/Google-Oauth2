const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")


const dbConnect = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("db connected successfully")
})


module.exports = {
    dbConnect
}