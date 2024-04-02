import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logo from '../assets/img/airbnb-1.svg'
import searchIcon from '../assets/img/search_glass.png'
import worldIcon from '../assets/img/world_icon.png'
import hamburgerIcon from '../assets/img/hamburger_menu.png'
import userIcon from '../assets/img/user_icon.png'
import { useEffect, useRef, useState } from 'react'
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

    const [showUserActionModal, setShowUserActionModal] = useState(false);
    const [largeMainFilter, setLargeMainFilter] = useState(false);
    const [activeMainFilter, setActiveMainFilter] = useState(-1)
    const mainFilterRef = useRef(null);

    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                setLargeMainFilter(false);
            }
        };

        const handleClickOutside = (event) => {
            if (mainFilterRef.current && !mainFilterRef.current.contains(event.target)) {
                setLargeMainFilter(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKeyPress);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function toggleUserActionModal() {
        setShowUserActionModal(!showUserActionModal);
    }

    function toggleMainFilterSize() {
        if (!largeMainFilter) {
            setLargeMainFilter(true);
        }
    }

    return (
        <header className="app-header full">
            <div className="app-header-logo-nav">
                <NavLink to="/">
                    <img className='app-logo' src={logo} alt="logo" />
                    <h1>staybnb</h1>
                </NavLink>
            </div>
            <div ref={mainFilterRef} className={`main-filter-header ${largeMainFilter ? 'large-main-filter' : ''}`} onClick={toggleMainFilterSize}>
                {largeMainFilter ? <button className={`main-filter-btn large ${activeMainFilter === 0 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(0) }}>Where <br></br> Search destinations</button> : <button className="main-filter-btn" onClick={() => { setActiveMainFilter(0) }}>Anywhere</button>}
                <div className="border-line"></div>
                {largeMainFilter ? <button className={`main-filter-btn large ${activeMainFilter === 1 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(1) }}>Check in <br></br> Add dates</button> : <button className="main-filter-btn" onClick={() => { setActiveMainFilter(1) }}>Any week</button>}
                <div className="border-line"></div>
                {largeMainFilter && <>
                    <button className={`main-filter-btn large ${activeMainFilter === 2 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(2) }}>Check out <br></br> Add dates</button>
                    <div className="border-line"></div>
                </>

                }
                {largeMainFilter ? (
                    <div className="main-filter-btn large">
                        <button className={`filter-content ${activeMainFilter === 3 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(3) }}>
                            <div className='text'>
                                Who
                                <br></br>
                                Add guests
                            </div>
                        </button>
                        <img className='search-glass' src={searchIcon} alt="search-icon" />  

                    </div>
                ) : (
                    <><button className="main-filter-btn" onClick={() => { setActiveMainFilter(3) }}>Add guests</button><img className='search-glass' src={searchIcon} alt="search-icon" /></>
                )}

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
        </header >
    );
}