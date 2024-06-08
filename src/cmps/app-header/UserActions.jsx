import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import worldIcon from "../../assets/img/world_icon.png";
import hamburgerIcon from "../../assets/img/hamburger_menu.png";
import userIcon from "../../assets/img/user_icon.png";
import { LoginForm } from "./LoginForm";
import { logout } from "../../store/actions/user.action";
import { userService } from "../../services/user.service";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";

export function UserActions() {
  const [showUserActionModal, setShowUserActionModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const userActionsModalRef = useRef(null);
  const loggedInUser = useSelector((storeState) => storeState.userModule.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('loggedInUser:', loggedInUser)

    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setShowUserActionModal(false);
      }
    };

    function handleClickOutside(event) {
      if (
        userActionsModalRef.current &&
        !userActionsModalRef.current.contains(event.target) &&
        !event.target.classList.contains("user-actions-container")
      ) {
        setShowUserActionModal(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {

  }, [loggedInUser]);

  function toggleUserActionModal() {
    setShowUserActionModal(
      (prevShowUserActionModal) => !prevShowUserActionModal
    );
  }

  function handleLoginClick() {
    setShowLoginModal(true);
  }

  function handleCloseLoginModal() {
    setShowLoginModal(false);
  }

  async function handleLogoutClick() {
    try {
      await logout()
      setShowUserActionModal(false);
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <div className="user-actions-header">
      <Link to={"/stay-edit/newStay"}>Staybnb Your Home</Link>
      <div className="world-icon">
        <img src={worldIcon} alt="world-icon" />
      </div>
      <div className="user-actions-container" onClick={toggleUserActionModal}>
        <img
          className="hamburger-menu-icon"
          src={hamburgerIcon}
          alt="hamburger-menu-icon"
        />
        <img
          className="user-icon"
          src={loggedInUser ? loggedInUser.imgUrl : userIcon}
          alt="user-icon"
        />
        <div
          ref={userActionsModalRef}
          className={`user-actions-modal ${showUserActionModal ? "" : "hidden"
            }`}
        >
          <div>
            {!loggedInUser ? (
              <>
                <a href="#" className="user-action" onClick={handleLoginClick}>
                  Sign up
                </a>
                <a href="#" className="user-action" onClick={handleLoginClick}>
                  Log in
                </a>
              </>
            ) : (
              <a href="#" className="user-action" onClick={handleLogoutClick}>
                Log out
              </a>
            )}
            <div className="hr"></div>
            <Link to={"/dashboard/listing"} className="user-action">
              Dashboard
            </Link>
            <Link to={"/stay-edit/newStay"} className="user-action">
              Staybnb your home
            </Link>
            <a href="#" className="user-action">
              Help Center
            </a>
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
