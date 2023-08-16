const express=require('express')
const bodyParser=require('body-parser')
const app=new express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

const list=[
    {
        id:1,
        title:"Buying Grocessies from market",
        priority:"high",
        isCompleted:false
    },
    {
        id:2,
        title:"Going to Ground",
        priority:"medium",
        isCompleted:false
    }
]


app.get('/api/v1/list',(req,res)=>{
    res.send(list);
});


app.get('/api/v1/list/:id',(req,res)=>{
    let result;
    let id=req.params.id;
    let i=0;
    while(list[i].id!=id){
        i++;
    }
    result=list[i];
    if(result){
        res.send(result)
    }else{
        res.send('Not found')
    }
})

app.get('/api/v1/list/priority/:priority',(req,res)=>{
    let result;
    let priority=req.params.priority;
    let i=0;
    while(list[i].priority!=priority){
        i++;
    }
    result=list[i];
    if(result){
        res.send(result)
    }else{
        res.send('Not found')
    }
})

app.put('/api/v1/list/update/:id',(req,res)=>{
    let id=req.params.id;
    for(let i=0;i<list.length;i++){
        if(list[i].id==id){
            if(req.body.title){list[i].title=req.body.title;}
            if(req.body.priority){list[i].priority=req.body.priority;}
            if(req.body.isCompleted){list[i].isCompleted=req.body.isCompleted;}
            
            break;
        }
    }
    res.send("Updated")
})

app.post('/api/v1/list',(req,res)=>{
    // let newId=list[0].id+1
    let newTask=req.body;
    // newTask.id=newId
    list.unshift(newTask)
    res.send({status:"Created"})
})

app.delete('/api/v1/list/delete/:id',(req,res)=>{
    let id=req.params.id;
    let i=0;
    while(id!=list[i].id){
        i++;
    }
    if(i){
        list.splice(i,1)
        res.send("Success")
    }else{
        res.send("Not Found")
    }
    
})

app.listen(3000,()=>{
    console.log('App started');
})