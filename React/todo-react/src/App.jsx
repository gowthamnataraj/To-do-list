import { nanoid } from 'nanoid'
import './App.css'
import NewItem from './components/NewItem/NewItem'
import TodoList from './components/TodoList/TodoList'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const App=()=> {

  const [list,setList]=useState([])
  const[editState,setEditState]=useState({})
  const[useFilter,setUseFilter]=useState({})

  useEffect(()=>{
    console.log("effect")
    fetch("http://localhost:3000/api/v2/todo").then((res)=>{
      res.json().then((json)=>{
        setList(json)
      })
    }).catch(()=>{
      console.log('Network Error!!')
    })
  },[editState])

  const deleteItem=(id)=>{
     //const filteredList= list.filter((item)=>item.id!==id)
     fetch(`http://localhost:3000/api/v2/todo/${id}`,
    {
      method:'DELETE',
      //body:JSON.stringify(id),
      }).then(()=>{
        console.log('Deleted');
        setEditState({})
        toast.success("Deleted Successfully");
      })
     
  }
  const addItem=(item)=>{
   // item.id=nanoid();
    fetch('http://localhost:3000/api/v2/todo',
    {
      method:'POST',
      headers:{
        'Accept':'application/json,text/plain,*/*',
        'Content-type':'application/json'
      },
      body:JSON.stringify(item),
      }).then(()=>{
        setList((prev)=>[item,...prev])
        toast.success("Inserted Successfully");
      })
  }

  const triggerEdit=(item)=>
  {
    
      setEditState(item);
  }

  const editItem=(updatedItem)=>
  {
    console.log(updatedItem.id)
    fetch(`http://localhost:3000/api/v2/todo/${updatedItem.id}`,
    {
      method:'PUT',
      headers:{
        'Accept':'application/json,text/plain,*/*',
        'Content-type':'application/json'
      },
      body:JSON.stringify(updatedItem),
      }).then(()=>{
        // setList((prev)=>[updatedItem,...prev])
        toast.success("Updated Successfully");
        setEditState({})
      })
  }
  
  return(
    <div className="app">
    <h1 className="title">To-Do List</h1>
     <NewItem addItem={addItem} editState={editState} editItem={editItem}/>
    <TodoList list={list} deleteItem={deleteItem} triggerEdit={triggerEdit}/>
    </div>
  )
}

export default App
