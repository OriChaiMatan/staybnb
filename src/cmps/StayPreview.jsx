import { useState } from "react"
import { Link } from "react-router-dom"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/scss/image-gallery.scss"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import StarSmall from "../svg/StarSmallSvg"


import img_example1 from "../assets/img/stay_demo_img/2_3.png"
import img_example2 from "../assets/img/stay_demo_img/2_2.png"
import img_example3 from "../assets/img/stay_demo_img/3_2.png"
import img_example4 from "../assets/img/stay_demo_img/2_1.png"
import img_example5 from "../assets/img/stay_demo_img/1_1.png"
import { utilService } from "../services/util.service"

// const imgUrlsss = [
//         "https://res.cloudinary.com/dqti9icif/image/upload/2_1_tfy50l",
//         "https://res.cloudinary.com/dqti9icif/image/upload/2_2_xepifd",
//         "https://res.cloudinary.com/dqti9icif/image/upload/2_3_o4ikp0",
//         "https://res.cloudinary.com/dqti9icif/image/upload/2_4_e9elfy"
//     ]


export function StayPreview({ stay }) {

    const [isHovered, setIsHovered] = useState(false);

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
            <Link to={`/stay/${stay._id}`} target="_blank">
                <div className="stay-photo-gallery"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <Slider arrows={isHovered} {...settings} >
                        {stay.imgUrls.map((imgUrl, index) => (
                            <div className="imgs" key={index}>
                                <img src={imgUrl} alt={`Stay Image ${index + 1}`} />
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
