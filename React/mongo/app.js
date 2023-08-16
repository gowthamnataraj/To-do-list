const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const {getAllTodoList,createTodo,getTodoByID,deleteId,updateId,getTodoByPriority}=require('./controller/todo');
const {connectDb}=require('./config/db');
connectDb();
const app = new express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/v2/todo',getAllTodoList);
app.post('/api/v2/todo',createTodo);
app.get('/api/v2/todo/:id',getTodoByID);
app.delete('/api/v2/todo/:id',deleteId);
app.put('/api/v2/todo/:id',updateId);
// app.get('/api/v2/todo/priority',getTodoByPriority)
app.listen(3000,()=>{
    console.log('Server is running!....');
})

