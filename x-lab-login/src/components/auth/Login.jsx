import React, {useState} from 'react';

import { login } from '../../api/openApi';

import './Login.css';

function Login({onSuccess}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const doLogin = (username, password) => {
        login(username, password)
            .then(() => {
                onSuccess(username);
            })
            .catch(console.error);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        doLogin(username, password);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="login-block">
                    <h2 className="login-title">Авторизация</h2>
                    <input 
                        id="username"
                        className="login-input" 
                        type="text" 
                        name="username" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername((e.target).value.trim())}
                        required={true}
                        minLength={4}
                    />
                    <input 
                        id="password"
                        className="login-input" 
                        type="text" 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword((e.target).value.trim())}
                        required={true}
                    />
                    <button type="submit" className="login-submit">Вход</button>
                </div>
            </form>
        </div>
    )
}

export default Login;