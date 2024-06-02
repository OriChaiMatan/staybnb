import { useState } from "react"
import { Link } from "react-router-dom"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { utilService } from "../services/util.service"

import StarSmall from "../svg/StarSmallSvg"
import HurtWishlistSvg from "../svg/HurtWishlistSvg"


export function StayPreview({ stay }) {
    const [isHovered, setIsHovered] = useState(false)

    const demoLogInUser = {
        id: "u110",
        fullname: "Daniel Smith",
        imgUrl: "http://res.cloudinary.com/dqti9icif/image/upload/v1716982768/men4_yio0gl.jpg",
        username: "Daniel",
        passworg: "daniel123",
        address: "Kalisz, Poland"
    }
    const isLikedByUser = stay.likedByUsers&&stay.likedByUsers.some(likedByUser => likedByUser.id === demoLogInUser.id)


    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    }

    return (
        <div className="stay-preview">
            <Link to={`/stay/${stay._id}`} target="_blank" >
                <div className="stay-photo-gallery"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <HurtWishlistSvg className={`wish-list-icon ${(isLikedByUser) ? 'liked' : ''}`} />
                    <Slider arrows={isHovered} {...settings} >
                        {stay.imgUrls.map((imgUrl, index) => (
                            <div className="imgs" key={index}>
                                <img src={imgUrl.imgUrl} alt={`Stay Image ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="stay-preview-information">

                    <div className="common-info">
                        <span className="name-info">{stay.loc.city}, {stay.loc.country}</span>
                        {utilService.calculateAvgRating(stay.reviews) !== '0.00' && utilService.calculateAvgRating(stay.reviews) !== '0.0' && (
                            <span className="avg-rating-info"><StarSmall /> {utilService.calculateAvgRating(stay.reviews)}</span>
                        )}
                    </div>
                    <span className="loc-info"> {Math.ceil(utilService.calculateDistance(stay.loc.lat, stay.loc.lng)).toLocaleString()} kilometers away</span>
                    <span className="date-info">{utilService.formatDateRange(stay.startDate, stay.endDate)}</span>
                    <span className="price-info">${stay.price} <span>night</span></span>
                </div>
            </Link>
        </div>
    )
}
