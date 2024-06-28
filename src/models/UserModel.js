

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    viewHistory: {
        type : [ {type : mongoose.Schema.Types.ObjectId, ref : "Blog"}],
        required: false,
        unique: false,
    },
    password : {
        type : String,
        required : true,
        unique : false,
    }
})

userSchema.pre (
    "save",
    async function (next) {
        const user = this
        console.log("Pre- save hook running")

        if (!user.isModified("password")) {
            return 
        }

        console.log("Pre- save hook running and password is modified")

      


        next()
    }
)


const UserModel = mongoose.model("User", userSchema)

module.exports = {
    UserModel,
}