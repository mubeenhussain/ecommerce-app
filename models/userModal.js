import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true // remove whitespaces
    },
    email : {
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required:true
    },
    answer:{
        type:String,
        required: true
    },
    role: {
        type:Number,
        default:0
    }
},{
    timestamps:true // when a new user created its created time added in each record/document
});

export default mongoose.model('users',userSchema);