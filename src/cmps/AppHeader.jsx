import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import dayjs from 'dayjs';
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logo from '../assets/img/airbnb-1.svg'


import { MainFilter } from './app-header/MainFilter';
import { UserActions } from './app-header/UserActions';

// import { login, logout, signup } from '../store/user.actions.js'
// import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {
    // const user = useSelector(storeState => storeState.userModule.user)

    // async function onLogin(credentials) {
    //     try {
    //         const user = await login(credentials)
    //         showSuccessMsg(`Welcome: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot login')
    //     }
    // }
    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot signup')
    //     }
    // }
    // async function onLogout() {
    //     try {
    //         await logout()
    //         showSuccessMsg(`Bye now`)
    //     } catch(err) {
    //         showErrorMsg('Cannot logout')
    //     }
    // }
    const [largeMainFilter, setLargeMainFilter] = useState(false);    
    const [selectedDates, setSelectedDates] = useState([
        dayjs('2022-04-17'), 
        dayjs('2022-04-21')  
      ]);

   
    
    return (
        <header className={`app-header full ${largeMainFilter ? 'large-header' : ''}`}>
            <div className="app-header-logo-nav">
                <NavLink to="/">
                    <img className='app-logo' src={logo} alt="logo" />
                    <h1>staybnb</h1>
                </NavLink>
            </div>
            <MainFilter largeMainFilter={largeMainFilter} setLargeMainFilter={setLargeMainFilter}/>
            <UserActions/>
        </header >
    );
}