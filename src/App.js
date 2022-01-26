import { useState, useRef, useEffect } from 'react';
import './App.css';
import ToDoList from './ToDoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    const { v4: uuidv4 } = require('uuid');
    if (name === '') return;
    setTodos(prevTodos => {

      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos =  todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }

  return (    
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add ToDo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    
  );
}

export default App;
