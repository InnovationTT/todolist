import React, { useContext, useEffect, useState } from 'react';
import  { auth }  from '../firebase'

const AuthContext = React.createContext();

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsub;
    }, [])
    
    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export {AuthContext, useAuth, AuthProvider} ;