import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import worldIcon from "../../assets/img/world_icon.png"
import hamburgerIcon from "../../assets/img/hamburger_menu.png"
import userIcon from "../../assets/img/user_icon.png"
import { LoginForm } from "./LoginForm"
import { logout } from "../../store/actions/user.action"
import { showErrorMsg } from "../../services/event-bus.service"
import { useWindowSize } from "../../customHooks/useWindowSize"
import ExploreSvg from "../../svg/toolbar/ExploreSvg"
import LogSvg from "../../svg/toolbar/LogSvg"
import WishSvg from "../../svg/toolbar/WishSvg"
import TripsSvg from "../../svg/toolbar/TripsSvg"

export function UserActions() {
  const [showUserActionModal, setShowUserActionModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const userActionsModalRef = useRef(null)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const windowSize = useWindowSize()

  useEffect(() => {

    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setShowUserActionModal(false)
      }
    }

    function handleClickOutside(event) {
      if (
        userActionsModalRef.current &&
        !userActionsModalRef.current.contains(event.target) &&
        !event.target.classList.contains("user-actions-container")
      ) {
        setShowUserActionModal(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKeyPress)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {

  }, [loggedInUser])

  function toggleUserActionModal() {
    setShowUserActionModal(
      (prevShowUserActionModal) => !prevShowUserActionModal
    )
  }

  function handleLoginClick() {
    setShowLoginModal(true)
  }

  function handleCloseLoginModal() {
    setShowLoginModal(false)
  }

  async function handleLogoutClick() {
    try {
      await logout()
      setShowUserActionModal(false)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  if (windowSize.width < 780) {
    return (
      <div className="mobile-user-actions-toolbar">
        <Link to={"/"}>
          <ExploreSvg />
          <span className="name-action">Explore</span>
        </Link>
        {loggedInUser &&
          <>
            <Link to={"/dashboard/wishlist"}>
              <WishSvg />
              <span className="name-action">Wishlist</span>
            </Link>

            <Link to={"/my-trips"}>
              <TripsSvg />
              <span className="name-action">Trips</span>
            </Link>
          </>
        }

        <div>

          {!loggedInUser ? (
            <>
              <a href="#" className="user-action" onClick={handleLoginClick}>
                <LogSvg />
                <span className="name-action">Log in</span>
              </a>
            </>
          ) : (
            <a href="/" className="user-action" onClick={handleLogoutClick}>
              <LogSvg />
              <span className="name-action">Log out</span>
            </a>
          )}

          {showLoginModal && (
            <div className="modal-overlay">
              <div className="login-modal">
                <LoginForm onClose={handleCloseLoginModal} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="user-actions-header">
      {loggedInUser && <Link to={"/stay-edit/newStay"}>Staybnb Your Home</Link>}
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

              <a href="/" className="user-action" onClick={handleLogoutClick}>
                Log out
              </a>

            )}
            <div className="hr"></div>
            {loggedInUser && <><Link to={"/dashboard/listing"} className="user-action">
              Dashboard
            </Link>
              <Link to={"/stay-edit/newStay"} className="user-action">
                Staybnb your home
              </Link>
              <Link to={"/my-trips"} className="user-action">
                My Trips
              </Link>
            </>}
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
  )
}