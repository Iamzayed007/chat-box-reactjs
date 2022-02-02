import React from 'react';
import {GoogleOutlined} from '@ant-design/icons'
import useAuth from '../hooks/useAuth';

const Login = () => {
    const {signInWithGoogle} = useAuth()
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Unichat</h2>
                <div className="login-button google"
                onClick={()=> signInWithGoogle()}
                >

                    <GoogleOutlined/> Login with Google
                </div>
            </div>
        </div>
    );
};

export default Login;