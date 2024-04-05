import worldIcon from '../assets/img/world_icon.png'
import { FaFacebookSquare } from "react-icons/fa"
import { FaTwitterSquare } from "react-icons/fa"
import { FaInstagramSquare } from "react-icons/fa"
import YesNoToggle from '../svg/YesNoToggle'


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
                        <YesNoToggle/>
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