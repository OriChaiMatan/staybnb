import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logo from '../assets/img/airbnb-1.svg'
import searchIcon from '../assets/img/search_glass.png'
import worldIcon from '../assets/img/world_icon.png'
import hamburgerIcon from '../assets/img/hamburger_menu.png'
import userIcon from '../assets/img/user_icon.png'
import mapEurope from '../assets/img/map_europe.jpg'
import mapFlexible from '../assets/img/map_flexible.jpg'
import mapGreece from '../assets/img/map_greece.jpg'
import mapItaly from '../assets/img/map_italy.jpg'
import mapSouthAmerica from '../assets/img/map_southamerica.jpg'
import mapUSA from '../assets/img/map_us.jpg'


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
    const [adultsAmount, setAdultsAmount] = useState(0)
    const [childrenAmount, setChildrenAmount] = useState(0)
    const [infantsAmount, setInfantsAmount] = useState(0)
    const [petsAmount, setPetsAmount] = useState(0)
    const [selectedDates, setSelectedDates] = useState([
        dayjs('2022-04-17'), 
        dayjs('2022-04-21')  
      ]);
    const mainFilterRef = useRef(null);

    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                setLargeMainFilter(false);
                setActiveMainFilter(-1)
            }
        };

        const handleClickOutside = (event) => {
            if (mainFilterRef.current && !mainFilterRef.current.contains(event.target)) {
                setLargeMainFilter(false);
                setActiveMainFilter(-1)
            }
        };

        const handleScroll = () => {
            if (document.documentElement.scrollTop > 20) {
                setLargeMainFilter(false);
                setActiveMainFilter(-1)

            } else {
                setLargeMainFilter(true);
            }
        };
        document.addEventListener('keydown', handleEscapeKeyPress);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
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
    
    function handleAmountChange(type, operation) {
        switch (type) {
            case 'adults':
                setAdultsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'children':
                setChildrenAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'infants':
                setInfantsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'pets':
                setPetsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            default:
                break;
        }
    }
    
    return (

        <header className={`app-header full ${largeMainFilter ? 'large-header' : ''}`}>
            <div className="app-header-logo-nav">
                <NavLink to="/">
                    <img className='app-logo' src={logo} alt="logo" />
                    <h1>staybnb</h1>
                </NavLink>
            </div>
            <div ref={mainFilterRef} className={`main-filter-header ${largeMainFilter ? 'large-main-filter' : ''}`} onClick={toggleMainFilterSize} style={{ backgroundColor: activeMainFilter >= 0 ? '#ebebeb' : '#fff' }}>
                {largeMainFilter ? <label className={`main-filter-btn large ${activeMainFilter === 0 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(0) }}><div><span>Where</span> <br></br> <input type="text" placeholder="Search destinations"/></div>
                {activeMainFilter === 0 && <section className='add-dest-modal'>
                    <div>
                        <h2 className='search-by-region'>Search by region</h2>
                        <section className='region-choice'>
                            <div>
                                <img src={mapFlexible} alt="world_map" />
                                <div className="region-p">I'm flexible</div>
                            </div>
                            <div>
                                <img src={mapEurope} alt="europe_map" />
                                <div className="region-p">Europe</div>
                            </div>
                            <div>
                                <img src={mapItaly} alt="italy_map" />
                                <div className="region-p">Italy</div>
                            </div>
                            <div>
                                <img src={mapUSA} alt="usa_map" />
                                <div className="region-p">United States</div>
                            </div>
                            <div>
                                <img src={mapGreece} alt="greece_map" />
                                <div className="region-p">Greece</div>
                            </div>
                            <div>
                                <img src={mapSouthAmerica} alt="south_america_map" />
                                <div className="region-p">South America</div>
                            </div>
                        </section>
                    </div>
                    </section>}
                </label> : <button className="main-filter-btn" onClick={() => { setActiveMainFilter(0) }}>Anywhere</button>}
                <div className="border-line"></div>
                {largeMainFilter ? <button className={`main-filter-btn large ${activeMainFilter === 1 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(1) }}>Check in <br></br> Add dates</button> : <button className="main-filter-btn" onClick={() => { setActiveMainFilter(1) }}>Any week</button>}
                <div className="border-line"></div>
                {largeMainFilter && <>
                    <button className={`main-filter-btn large ${activeMainFilter === 2 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(2) }}>Check out <br></br> Add dates</button>
                    <div className="border-line"></div>
                </>}
                {(activeMainFilter === 1 || activeMainFilter === 2) && (
                    <section className='add-dates-modal'>
                        
                    </section>
                )}
                {largeMainFilter ? (
                    <div className="main-filter-btn large">
                        <button className={`filter-content ${activeMainFilter === 3 ? 'active-filter' : ''}`} onClick={() => { setActiveMainFilter(3) }}>
                            <div className='text'>
                                Who
                                <br></br>
                                Add guests
                            </div>
                        </button>
                        <button className="large-search-btn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <span >Search</span>
                        </button>
                        {activeMainFilter === 3 && <section className='add-guests-modal'>
                            <div>
                                <h2>Adults</h2>
                                <p className='add-guests-modal-p'>Ages 13 or above</p>
                            </div>
                            <div className='add-guests-modal-btns'>
                                <button className={`add-guest-btn ${adultsAmount === 0 ? 'disabled' : ''}`} onClick={() => {handleAmountChange('adults','decrement')}}>
                                    <span>-</span>
                                </button>
                                <span className="add-guest-num">{adultsAmount}</span>
                                <button className="add-guest-btn" onClick={() => {handleAmountChange('adults','increment')}}>
                                    <span>+</span>
                                </button>
                            </div>
                            <div>
                                <h2>Children</h2>
                                <p className='add-guests-modal-p'>Ages 2-12</p>
                            </div>
                            <div className='add-guests-modal-btns'>
                                <button className={`add-guest-btn ${childrenAmount === 0 ? 'disabled' : ''}`} onClick={() => {handleAmountChange('children','decrement')}}>
                                    <span>-</span>
                                </button>
                                <span className="add-guest-num">{childrenAmount}</span>
                                <button className="add-guest-btn" onClick={() => {handleAmountChange('children','increment')}}>
                                    <span>+</span>
                                </button>
                            </div>
                            <div>
                                <h2>Infants</h2>
                                <p className='add-guests-modal-p'>Under 2</p>
                            </div>
                            <div className='add-guests-modal-btns'>
                                <button className={`add-guest-btn ${infantsAmount === 0 ? 'disabled' : ''}`} onClick={() => {handleAmountChange('infants','decrement')}}>
                                    <span>-</span>
                                </button>
                                <span className="add-guest-num">{infantsAmount}</span>
                                <button className="add-guest-btn" onClick={() => {handleAmountChange('infants','increment')}}>
                                    <span>+</span>
                                </button>
                            </div>
                            <div>
                                <h2>Pets</h2>
                                <a href='#' className='add-guests-modal-p pet'>Bringing a service animal?</a>
                            </div>
                            <div className='add-guests-modal-btns'>
                                <button className={`add-guest-btn ${petsAmount === 0 ? 'disabled' : ''}`} onClick={() => {handleAmountChange('pets','decrement')}}>
                                    <span>-</span>
                                </button>
                                <span className="add-guest-num">{petsAmount}</span>
                                <button className="add-guest-btn" onClick={() => {handleAmountChange('pets','increment')}}>
                                    <span>+</span>
                                </button>
                            </div>
                        </section>}
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