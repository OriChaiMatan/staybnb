import React, { useEffect, useRef, useState } from 'react';
import { userService } from '../../services/user.service';
import { useDispatch } from 'react-redux';
import { login, signup } from "../../store/actions/user.action";
import { showErrorMsg } from '../../services/event-bus.service';

export function LoginForm({ onClose }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState(false)
    const loginModalRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        };

        const handleClickOutside = (event) => {
            if (loginModalRef.current && !loginModalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKeyPress);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    async function handleSignup() {
        try {
            await signup({ email, password });
            onClose()
            console.log("123123213")
            handleLogin({ email, password })
        } catch (err) {
            console.log("Signup failed:", err);
            setErrorMsg(true)
        }
    }

    async function handleLogin() {
        try {
            const user = await login({ email, password });
            console.log(user);
            onClose();
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMsg(true)
        }
    }

    return (
        <div ref={loginModalRef} className="login-form">
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
                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <span>We’ll call or text you to confirm your number. Standard message and data rates apply. <a className='privacy-policy'>Privacy Policy</a></span>
                {errorMsg && <div className="error-message">Incorrect email or password. Please try again.</div>}
                <button type="button" className='login-continue-btn' onClick={handleLogin}>Continue</button>
                <button type="button" className='login-continue-btn signup-btn' onClick={handleSignup}>Sign up</button>
            </form>
        </div>
    );
}
