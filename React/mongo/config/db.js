const mongoose =require('mongoose')
exports.connectDb=async()=>{
    try{
        const conn=await mongoose.connect('mongodb://localhost:27017/todo')
        console.log('db is connected');
    }catch (error){
        console.log('error in db connection');
        console.log(error);
    }
}