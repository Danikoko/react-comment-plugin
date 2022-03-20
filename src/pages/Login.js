import axios from 'axios';
import React, { useState } from 'react';

function Login({setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginText, setLoginText] = useState('Login');

    const handleEmailInput = e => setEmail(e.target.value);
    const handlePasswordInput = e => setPassword(e.target.value);

    const handleLogin = () => {
        setLoginText('...');
        axios.post('https://tests.tee-solutions.com/api/login', {
            email,
            password
        })
        .then(response => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem('user', JSON.stringify(response.data))
                setUser(JSON.parse(localStorage.getItem('user')));
                console.log(response);
            }
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {
            setLoginText('Login');
        })
    }

    return (
        <div className="container pt-5">
            <h2>Login Form</h2>
            <form className="mt-2">
                <div className="form-group">
                    <input value={email} style={ {width:'350px',border:'none'} } onChange={handleEmailInput} autoComplete="off"
                        className="form-control mb-2" placeholder="Enter e-mail address" id="email"
                        required />
                </div>
                <div className="form-group">
                    <input value={password} style={ {width:'350px',border:'none'} } onChange={handlePasswordInput} autoComplete="off"
                        className="form-control mb-2" type="password" placeholder="Enter password" id="password"
                        required />
                </div>
                <div className="send" id="send">
                    <div style={ { width: '100%', display: 'block' } } className="btn">
                        <button style={ { width: '100%' } } onClick={email.length >= 3 && password.length ? handleLogin : null} type="button" className="send-btn">{loginText}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;