import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext'
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

export default function App() {
  

  return (    
    <div className='App'>
      <header className='App-body'>
        
          <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
            <div className='w-100' style={{ maxWidth: "400px"}}>
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route exact path="/" element={<PrivateRoute/>}>
                      <Route exact path="/" element={<Dashboard/>}/>
                    </Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                  </Routes>
                </AuthProvider>
              </Router>
               
            </div>
          </Container>
        
          

      </header>
    </div>
    
  );
}


