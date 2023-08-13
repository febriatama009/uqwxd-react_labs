//file ini yang dirubah

import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("")

  //read data
  React.useEffect(() => {
    const json = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(json)
    if(loadedTodos){
        setTodos(loadedTodos)
    }
  },[])

  //save data
  React.useEffect(() => {
    if([todos].length > 0){
        const json = JSON.stringify(todos);
        localStorage.setItem('todos', json);
    }
  },[todos])
  
  // Add the handlesubmit code here
  const handleSubmit = (e) => {
    e.preventDefault()

    const newTodo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false,
    }

    if(newTodo.text.length > 0){
        setTodos([...todos].concat(newTodo))
        setTodo("")
    }else {
        alert("Invalid Task");
        setTodo("")
    }
  }
  
  // Add the deleteToDo code here
  const deleteTodo = (id) => {
    let updateTodo = [...todos].filter((todo) => todo.id !== id);
    setTodos(updateTodo);
  }
  
  // Add the toggleComplete code here
  const toggleComplete = (id) => {
      let updateTodo = [...todos].map((todo) => {
          if(todo.id === id){
              todo.completed = !todo.completed
          }
          return todo;
      })
      setTodos(updateTodo)
  }
  
  // Add the submitEdits code here
  const submitEdits = (id) => {
    const updateTodo = [...todos].map((todo) => {
        if(todo.id === id){
            todo.text = editingText;
        }
        return todo;
    })
    setTodos(updateTodo);
    setTodoEditing(null);
  }
  
return(
<div className ="App">
    <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
            <input type ="text" onChange={(e) => setTodo(e.target.value)} placeholder="Add New Task" value={todo}/>
            <button type ="submit">Add Todo</button>
        </form>

{todos.map((todo) => 
    <div className="todo" key={todo.id}>
        <div className="todo-text">
            <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/> 
            {
                todo.id === todoEditing ? (
                    <input type="text" onChange={(e) => setEditingText(e.target.value)} />
                ) : (
                    <div align="center">{todo.text}</div>
                )
            }
        </div> 

        <div className="todo-actions">
            {
                todo.id === todoEditing ? (
                    <button onClick = {() => submitEdits(todo.id)}>Submit</button>
                ) : (
                    <button onClick = {() => setTodoEditing(todo.id)}>Edit</button>
                )
            }
        </div>  
        <button onClick={() => deleteTodo(todo.id)}>Delete Todo</button>
    </div>
    )}

</div>
);
};
export default App;
