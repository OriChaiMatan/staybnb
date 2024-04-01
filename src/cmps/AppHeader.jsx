import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logo from '../assets/img/airbnb-1.svg'
import searchIcon from '../assets/img/search_glass.png'
import worldIcon from '../assets/img/world_icon.png'
import hamburgerIcon from '../assets/img/hamburger_menu.png'
import userIcon from '../assets/img/user_icon.png'
import { useState } from 'react'
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

    const [showUserActionModal, setShowUserActionModal] = useState(false)
    const [largeMainFilter, setLargeMainFilter] = useState(false)

    function toggleUserActionModal() {
        setShowUserActionModal(!showUserActionModal)
    }

    function toggleMainFilterSize() {
        setLargeMainFilter(!largeMainFilter)
    }


    return (
        <header className="app-header">
            <div className="app-logo-nav">
                <NavLink to="/">
                    <img className='app-logo' src={logo} alt="logo" />
                    <h1>staybnb</h1>
                </NavLink>
            </div>
            <div className={`main-filter-header ${largeMainFilter ? 'large-main-filter' : ''}`} onClick={toggleMainFilterSize}>
                <button className="main-filter-btn">Anywhere</button>
                <div className="border-line"></div>
                <button className="main-filter-btn">Any week</button>
                <div className="border-line"></div>
                <button className="main-filter-btn">Add guests</button>
                <img className='search-glass' src={searchIcon} alt="search-icon" />
            </div>
            <div className="user-actions-header">
                <a>Staybnb Your Home</a>
                <div className="world-icon" >
                    <img src={worldIcon} alt="world-icon" />
                </div>
                <div className="user-actions-container" onClick={toggleUserActionModal}>
                    <img className='hamburger-menu-icon' src={hamburgerIcon} alt="hamburger-menu-icon" />
                    <img className='user-icon' src={userIcon} alt="user-icon" />
                    <div className={`user-actions-modal ${showUserActionModal ? '' : 'hidden'}`}>
                        <div>
                            <a href="#" className='user-action'>Sign up</a>
                            <a href="#" className='user-action'>Log in</a>
                            <div className='hr'></div>
                            <a href="#" className='user-action'>Gift cards</a>
                            <a href="#" className='user-action'>Airbnb your home</a>
                            <a href="#" className='user-action'>Help Center</a>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}