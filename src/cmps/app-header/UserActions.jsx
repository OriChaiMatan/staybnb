import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import worldIcon from '../../assets/img/world_icon.png'
import hamburgerIcon from '../../assets/img/hamburger_menu.png'
import userIcon from '../../assets/img/user_icon.png'
import { LoginForm } from './LoginForm';

export function UserActions() {
    const [showUserActionModal, setShowUserActionModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const userActionsModalRef = useRef(null)

    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                setShowUserActionModal(false)
            }
        };

        function handleClickOutside(event) {
            if (
                userActionsModalRef.current && // Ensure modal ref exists
                !userActionsModalRef.current.contains(event.target) && // Clicked outside modal
                !event.target.classList.contains('user-actions-container') // Clicked target is not the user-actions-container
            ) {
                setShowUserActionModal(false);
            }
        }

        document.addEventListener('keydown', handleEscapeKeyPress);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    function toggleUserActionModal() {
        setShowUserActionModal((prevShowUserActionModal) => !prevShowUserActionModal);
    }


    function handleLoginClick() {
        setShowLoginModal(true);
    }

    function handleCloseLoginModal() {
        setShowLoginModal(false);
    }
    const userString = sessionStorage.getItem('loggedinUser');
    const loggedinUser = JSON.parse(userString);

    return (
        <div className="user-actions-header">
            <Link to={'/stay-edit/newStay'}>Staybnb Your Home</Link>
            <div className="world-icon" >
                <img src={worldIcon} alt="world-icon" />
            </div>
            <div className="user-actions-container" onClick={toggleUserActionModal}>
                <img className='hamburger-menu-icon' src={hamburgerIcon} alt="hamburger-menu-icon" />
                <img className='user-icon' src={loggedinUser ? loggedinUser.imgUrl : userIcon} alt="user-icon" />
                <div ref={userActionsModalRef} className={`user-actions-modal ${showUserActionModal ? '' : 'hidden'}`}>
                    <div>
                        <a href="#" className='user-action' onClick={handleLoginClick}>Sign up</a>
                        <a href="#" className='user-action' onClick={handleLoginClick}>Log in</a>
                        <div className='hr'></div>
                        <a href="#" className='user-action'>Gift cards</a>
                        <Link to={'/stay-edit/newStay'} className='user-action'>Airbnb your home</Link>
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
