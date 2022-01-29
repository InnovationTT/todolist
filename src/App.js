import { useState, useRef, useEffect } from 'react';
import './App.css';
import ToDoList from './ToDoList';
import Button from '@mui/material/Button';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

export default function App() {
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
    <div className='App'>
      <header className='App-body'>
          <AuthProvider>
          <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
            <div className='w-100' style={{ maxWidth: "400px"}}>
              <Signup/>
            </div>
          </Container>
          </AuthProvider>
          
        
        
        
        <ToDoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type="text"/>
        <Button variant="contained" onClick={handleAddTodo} color="success">Add To-Do</Button>
        <Button variant="contained" onClick={handleClearTodos} color="secondary">Clear Completed</Button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </header>
    </div>
    
  );
}


