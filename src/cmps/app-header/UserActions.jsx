import { useState } from 'react';
import worldIcon from '../../assets/img/world_icon.png'
import hamburgerIcon from '../../assets/img/hamburger_menu.png'
import userIcon from '../../assets/img/user_icon.png'

export function UserActions() {
    const [showUserActionModal, setShowUserActionModal] = useState(false);

    function toggleUserActionModal() {
        setShowUserActionModal(!showUserActionModal);
    }
    
    return (
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
    );
}
