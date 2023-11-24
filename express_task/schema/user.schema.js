import mongoose from "mongoose";


const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    file:{
        type:String,
        required:true
    }
});

export default mongoose.model.users || mongoose.model("User",schema)