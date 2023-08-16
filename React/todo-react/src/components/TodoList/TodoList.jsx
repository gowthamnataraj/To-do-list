import { useState } from "react";
import TodoListItem from "./TodoListItem/TodoListItem";

const TodoList = (props) => {

    const {list,deleteItem,triggerEdit}= props

    if(list.length<=0)
    {
        return(
            <center>Hurray No pending items</center>
       )
    }
    return(
        <>
            {list.map((item,index) => (
            <TodoListItem key={index} item={item} index={index} onDelete={deleteItem} onEdit={triggerEdit}/>
            ))}
        </>
    )
}

export default TodoList;