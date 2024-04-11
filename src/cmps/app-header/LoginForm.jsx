import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function LoginForm({ onClose }) {
    // You can handle form submission and state management here
    return (
        <div className="login-form">
            <header className='login-form-header'>
                <div></div>
                <div>
                    <h1>Log in or sign up</h1>
                </div>
                <div></div>
            </header>
            <div className='close-login-container'>
                <button onClick={onClose}>X</button>
            </div>
            <form>
                <div><h3>Welcome to Airbnb</h3></div>

                <div className='inputs-container'>
                    <input type="email" placeholder='Enter your email' />
                    <input type="password" placeholder='Enter your password' />
                </div>
                <span>We’ll call or text you to confirm your number. Standard message and data rates apply. <a className='privacy-policy'>Privacy Policy</a></span>
                <button className='login-continue-btn'>Continue</button>
            </form>
        </div>
    );
}

export default LoginForm;
