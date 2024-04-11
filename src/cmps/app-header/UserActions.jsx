import { useState } from 'react';
import { Link } from "react-router-dom";
import worldIcon from '../../assets/img/world_icon.png'
import hamburgerIcon from '../../assets/img/hamburger_menu.png'
import userIcon from '../../assets/img/user_icon.png'
import LoginForm from './LoginForm';

export function UserActions() {
    const [showUserActionModal, setShowUserActionModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    function toggleUserActionModal() {
        setShowUserActionModal(!showUserActionModal);
    }

    function handleLoginClick() {
        setShowLoginModal(true);
    }

    function handleCloseLoginModal() {
        setShowLoginModal(false);
    }

    return (
        <div className="user-actions-header">
            <Link to={'/stay-edit/newStay'}>
                <a>Staybnb Your Home</a>
            </Link>
            <div className="world-icon" >
                <img src={worldIcon} alt="world-icon" />
            </div>
            <div className="user-actions-container" onClick={toggleUserActionModal}>
                <img className='hamburger-menu-icon' src={hamburgerIcon} alt="hamburger-menu-icon" />
                <img className='user-icon' src={userIcon} alt="user-icon" />
                <div className={`user-actions-modal ${showUserActionModal ? '' : 'hidden'}`}>
                    <div>
                        <a href="#" className='user-action'>Sign up</a>
                        <a href="#" className='user-action' onClick={handleLoginClick}>Log in</a>
                        <div className='hr'></div>
                        <a href="#" className='user-action'>Gift cards</a>
                        <Link to={'/stay-edit/newStay'}>
                            <a href="#" className='user-action'>Airbnb your home</a>
                        </Link>
                        <a href="#" className='user-action'>Help Center</a>
                    </div>
                </div>
            </div>
            {showLoginModal && (
                <div className="modal-overlay">
                    <div className="login-modal">
                        <LoginForm onClose={handleCloseLoginModal} />
                    </div>
                </div>
            )}
        </div>
    );
}
