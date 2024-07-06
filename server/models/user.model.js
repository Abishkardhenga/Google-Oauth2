const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    googleId: {
        type: String
    },
    displayName: {
        type: String
    }, email: {
        type: String
    },
    image: {
        type: String
    },


})


const userModel = new mongoose.model("user", userSchema)
module.exports = userModel; 