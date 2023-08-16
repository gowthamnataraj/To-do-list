const mongoose=require('mongoose');
const TodoSchema=new mongoose.Schema({
    title:String,
    isCompleted:Boolean,
    priority:String,
})
module.exports=mongoose.model('test',TodoSchema);