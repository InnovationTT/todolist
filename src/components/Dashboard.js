import { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import Button from '@mui/material/Button';
import { Card, Button as BButton } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db }  from '../firebase'
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore"; 

//const LOCAL_STORAGE_KEY = 'todoApp.todos';

function Dashboard(props) {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout(){
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    }

    async function updateTodosDB(newTodos) {
        const docData = {};
        for (let i = 0; i < newTodos.length; i++){
            const todo = newTodos[i];
            docData["todo"+i] = {id: todo.id, name: todo.name, complete: todo.complete}
        }
        try {
            await setDoc(doc(db, "todosCollection", currentUser.email), docData); 
        
        } catch (e) {
            console.error("Error adding document: ", e);
        }       
    }

    onSnapshot(doc(db, "todosCollection", currentUser.email), (doc) => {
        //console.log("Current data: ", doc.data());
        const currTodos = [];
        for (let todo in doc.data()){
            //console.log(`${todo}: ${doc.data()[todo]}`);
            currTodos.push({ id: doc.data()[todo].id, name: doc.data()[todo].name, complete: doc.data()[todo].complete });
        }

    });

    useEffect(() => {
        // const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // if (storedTodos) setTodos(storedTodos)

        const getData = async () => {
            const docRef = doc(db, "todosCollection", currentUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                
                const currTodos = [];
                for (let todo in docSnap.data()){
                    currTodos.push({ id: docSnap.data()[todo].id, name: docSnap.data()[todo].name, complete: docSnap.data()[todo].complete });
                }
                console.log(currTodos);
                setTodos(currTodos);
            } else {
            // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        getData();
        
    }, [])

    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    // }, [todos])

    function toggleTodo(id){
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }

    async function handleAddTodo(e) {
        const name = todoNameRef.current.value;
        const { v4: uuidv4 } = require('uuid');
        if (name === '') return;
        setTodos(prevTodos => {
            const newTodos = [...prevTodos, { id: uuidv4(), name: name, complete: false }];
            updateTodosDB(newTodos);
            return newTodos;
        })
        
        todoNameRef.current.value = null;
    }

    function handleClearTodos() {     
        const newTodos =  todos.filter(todo => !todo.complete)
        updateTodosDB(newTodos);
        setTodos(newTodos);
    }
  
    return (
        <>  
            <Card>                   
                <Card.Body>
                    <strong className="text-secondary">Email: {currentUser.email}</strong> 
                    <h2 className="text-center text-primary mb-4" >Your To-Dos</h2>

                </Card.Body>
            </Card>
            <div>
                <ToDoList todos={todos} toggleTodo={toggleTodo}/>
                <input ref={todoNameRef} type="text"/>
                <Button variant="contained" onClick={handleAddTodo} color="success">Add To-Do</Button>
                <Button variant="contained" onClick={handleClearTodos} color="secondary">Clear Completed</Button>
                <div>{todos.filter(todo => !todo.complete).length} left to do</div>
            </div>
            <div className='w-100 text-center mt-2'>
                <BButton onClick={handleLogout}>Log Out</BButton>
            </div>
        </>
        
    );
}

export default Dashboard;