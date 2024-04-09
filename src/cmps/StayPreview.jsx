import { useState } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import img_example1 from "../assets/img/stay_demo_img/2_3.png"
import img_example2 from "../assets/img/stay_demo_img/2_2.png"
import img_example3 from "../assets/img/stay_demo_img/3_2.png"
import img_example4 from "../assets/img/stay_demo_img/2_1.png"
import img_example5 from "../assets/img/stay_demo_img/1_1.png"

const images = [
    {
        original: img_example1,
    },
    {
        original: img_example2,
    },
    {
        original: img_example3,
    },
    {
        original: img_example4,
    },
    {
        original: img_example5,
    },
]




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
            <Link to={`/stay/${stay._id}`}>
                <div className="stay-photo-gallery"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <Slider arrows={isHovered} {...settings} >
                        {images.map((image, index) => (
                            <div key={index}>
                                <img src={image.original} alt={`Stay Image ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="stay-preview-information">
                    <span className="name-info">{stay.name}</span>
                    <span className="loc-info">{stay.loc.country}-{stay.loc.city}-{stay.loc.address}</span>
                    <span className="price-info">${stay.price} <span>night</span></span>
                </div>
            </Link>
        </div>
    );
}
