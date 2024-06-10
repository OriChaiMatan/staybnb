import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { utilService } from "../services/util.service"

import StarSmall from "../svg/StarSmallSvg"
import HeartWishlistSvg from "../svg/HeartWishlistSvg"
import { useSelector } from "react-redux"

export function StayPreview({ stay, onUpdateStay }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [updatedStay, setUpdatedStay] = useState(stay)
    const loggedInUser = useSelector((storeState) => storeState.userModule.user);


    useEffect(() => {
    }, [updatedStay])

    const isLikedByUser = stay.likedByUsers.some(likedByUser => likedByUser._id === loggedInUser?._id)


    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleLike = (event) => {
        event.stopPropagation()
        event.preventDefault()
        let stayToUpdate
        if (isLikedByUser) {
            setUpdatedStay(prevStay => ({ ...prevStay, likedByUsers: prevStay.likedByUsers.filter(user => user._id !== loggedInUser._id) }))
            stayToUpdate = {
                ...updatedStay,
                likedByUsers: updatedStay.likedByUsers.filter(user => user._id !== loggedInUser._id)
            };
        } else {
            setUpdatedStay(prevStay => ({ ...prevStay, likedByUsers: [...prevStay.likedByUsers, { id: loggedInUser._id, fullname: loggedInUser.fullname }] }))
            stayToUpdate = {
                ...updatedStay,
                likedByUsers: [...updatedStay.likedByUsers, { _id: loggedInUser._id, fullname: loggedInUser.fullname }]
            };
        }
        try {
            onUpdateStay(stayToUpdate)
            setIsLike(!isLike)
        } catch (error) {
            console.error('Failed to update stay:', error)
        }
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
                    <div className={`wish-list-icon ${isLikedByUser ? 'liked' : ''}`}
                        onClick={handleLike}>
                        <HeartWishlistSvg />
                    </div>
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
                        {(utilService.calculateAvgRating(stay.reviews) !== '0.00' && utilService.calculateAvgRating(stay.reviews) !== '0.0') ?
                            <span className="avg-rating-info"><StarSmall /> {utilService.calculateAvgRating(stay.reviews)}</span> : <span className="avg-rating-info"><StarSmall /> 4.0</span>
                        }
                    </div>
                    {stay.loc.lat ? <span className="loc-info"> {Math.ceil(utilService.calculateDistance(stay.loc.lat, stay.loc.lng)).toLocaleString()} kilometers away</span> :
                        <span className="loc-info"> 360 kilometers away</span>
                    }
                    <span className="date-info">{utilService.formatDateRange(stay.startDate, stay.endDate)}</span>
                    <span className="price-info">${stay.price} <span>night</span></span>
                </div>
            </Link>
        </div>
    )
}
