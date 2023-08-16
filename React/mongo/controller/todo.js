const Todo=require('../model/todo');
exports.getAllTodoList=async(req,res)=>{
    try{
        const list=await Todo.find();
        return res.status(200).send(list)
    }catch (error){
        return res.status(500).json({
            msg:'Internal server error'
        })
    }
}

exports.createTodo = async(req,res)=>{
    try{
        const newTodo = await Todo.create(req.body);
        return res.status(201).json({
            data:newTodo,

        })
    }catch(error)
    {
        return res.status(500).json({
            msg:'Internal server error'
        })
    }
}

exports.getTodoByPriority = async (req,res)=> {
    try {
        const list = await Todo.find({priority : {$eq: req.params.priority}});
        return res.status(200).json({
            data: list,
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server error'
        })
    }
}
exports.getTodoByID = async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id);
        if(todo){
            return res.status(201).json({
                data:todo,
            })
        }
        else{
            return res.status(404).json({
                msg:'Todo not found!!!',
            })
        }
    }
    catch(error){
        return res.status(500).json({
            msg:'Internal server error'
        })
    }
}

exports.deleteId=async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id);
        if(todo)
        {
            const deleted=await Todo.deleteOne(todo);
            return res.status(201).json({
                msg:'Deleted successfully',
            })
        }
        else{
            return res.status(404).json({
                msg:'Todo not found!!!',
            })
        }
    }
    catch(error){
        return res.status(500).json({
            msg:'Internal server error'
        })
    }
}

exports.updateId = async(req,res)=>{
    try{
        const todo=await Todo.findById(req.params.id);
        console.log(todo);
        if(todo)
        {
            const updated=await Todo.findByIdAndUpdate(todo,req.body);
            console.log(updated);
            return res.status(201).json({
                msg:'Updated successfully',
            })
        }
        else{
            return res.status(404).json({
                msg:'Todo not found!!!',
            })
        }
    }
    catch(error)
    {
        return res.status(500).json({
            msg:'Internal server error'
        })
    }
}
