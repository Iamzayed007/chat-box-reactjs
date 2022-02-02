import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, getIdToken, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import {initializeAuth} from '../firebase';
import { useHistory } from 'react-router-dom';

initializeAuth()
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')
const history =useHistory()
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth()
    const signInWithGoogle = () => {

        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {

                const user = result.user;
                // saveUser(user.email, user.displayName, 'PUT')
                setAuthError('');
                
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    
    // observer user state 
     useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => {
                        // setToken(idToken)
                        history.push('/chats')
                    })
                const uid = user.uid;
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unsubscribed
    }, [])

    const logOut = () => {
        setIsLoading(true);

        signOut(auth).then(() => {
            // Sign-out successful.
            history.push('/')
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));


    }

    return{
        user,
        isLoading,
        history,
        signInWithGoogle,
        logOut,
        setIsLoading
    }

}


export default useFirebase;