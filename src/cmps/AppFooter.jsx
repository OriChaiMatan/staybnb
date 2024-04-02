import worldIcon from '../assets/img/world_icon.png'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";


export function AppFooter() {


    return (
        <footer className="app-footer full">
            <div className="app-footer-left">
                <div className="copyright">© 2024 Staybnb, Inc.</div>
                <div className="dot">·</div>
                <a href="#" className="footer-link">Terms</a>
                <div className="dot">·</div>
                <a href="#" className="footer-link">Sitemap</a>
                <div className="dot">·</div>
                <a href="#" className="footer-link">Privacy</a>
                <div className="dot">·</div>
                <a href="#" className="footer-link-with-svg">
                    <div className="footer-link">Your Privacy Choices</div>
                    <div className='svg-yes-no'>
                        <svg width="26" height="12" fill="none"><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" fill="#fff"></rect><path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path><path d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5" stroke="#06F" stroke-linecap="round"></path><path d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5" stroke="#fff" stroke-linecap="round"></path><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" stroke="#06F"></rect></svg>
                    </div>
                </a>
            </div>
            <div className="app-footer-right">
                <div className='language-selector'>
                    <img src={worldIcon} alt="world-icon" />
                    <a href="#" className='language'>English (US)</a>
                    <a href="#" className='currency'>₪ ILS</a>
                </div>
                <div className='icons'>
                    <FaFacebookSquare />
                    <FaTwitterSquare />
                    <FaInstagramSquare />
                </div>

            </div>

        </footer>
    )
}