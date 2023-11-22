import mongoose from "mongoose"
const schema = new mongoose.Schema({
    data:{
        type:String
    },
    myfile:{
        type:String
    }
})
export default mongoose.file||mongoose.model("files",schema);