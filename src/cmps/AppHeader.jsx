import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/img/airbnb-1.svg'


import { MainFilter } from './app-header/MainFilter';
import { UserActions } from './app-header/UserActions';


export function AppHeader() {

    const [largeMainFilter, setLargeMainFilter] = useState(false)
    return (
        <header className={`app-header full ${largeMainFilter ? 'large-header' : ''}`}>
            <div className="app-header-logo-nav">
                <NavLink to="/">
                    <img className='app-logo' src={logo} alt="logo" />
                    <h1>staybnb</h1>
                </NavLink>
            </div>
            <MainFilter largeMainFilter={largeMainFilter} setLargeMainFilter={setLargeMainFilter} />
            <UserActions />
        </header >
    );
}