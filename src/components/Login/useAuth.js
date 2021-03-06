import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);
const AuthContext = createContext();

export const AuthContexProvider = (props) =>{
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () =>{
    return useContext(AuthContext);
}


export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


const getUser = user =>{
  const {displayName, email} = user;
  return {name: displayName, email};
}

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res =>{
           const singInUser = getUser(res.user);
           setUser(singInUser);
           return res.user;
        })
        .catch(err=>{
            console.log(err);
            setUser(null);
            return err.message;
        })
    }
    
    const signOut = () =>{
       return firebase.auth().signOut().then(function() {
            // Sign-out successful.
            setUser(null);
            return true;
          }).catch(function(error) {
            // An error happened.
            console.log(error);
            return false;
          });
    } 

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              const currUser = getUser(user);
              setUser(currUser);
            } else {
              // No user is signed in.
            }
          });
    }, []);

    return {
        user,
        signInWithGoogle,
        signOut
    }

}

export default Auth;