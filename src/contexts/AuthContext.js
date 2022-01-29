import React, { useContext, useEffect, useState } from 'react';
import  { auth }  from '../firebase'

const AuthContext = React.createContext();

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        return unsub;
    }, [])
    
    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, useAuth, AuthProvider} ;