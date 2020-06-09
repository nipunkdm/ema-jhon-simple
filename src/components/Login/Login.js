import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () =>{
        auth.signInWithGoogle()
        .then(res=>{
            window.location.pathname = "/review";
        })
    }

    const handleSignOut = () =>{
        auth.signOut()
        .then(res=>{
           window.location.pathname = "/";
        });
    }

    return (
        <div className="text-center">
            <h1>Login</h1>
            {
                auth.user ? <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button> :
                <button className="btn btn-success" onClick={handleSignIn}>Sing In With Google</button>
            }
        </div>
    );
};

export default Login;