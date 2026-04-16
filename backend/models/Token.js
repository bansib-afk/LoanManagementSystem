import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    accessToken:{
        type : String,
        required : true
    },
    isValid:{
        type: Boolean,
        default : true
    },
    createdAt: {
        type : Date,
        default : Date.now(),
        expires : 60 * 60 * 24 * 30
    }
})

export default mongoose.model("Token", tokenSchema)