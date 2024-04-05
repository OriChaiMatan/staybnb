import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";


import img_example1 from "../assets/img/stay_demo_img/2_3.png"
import img_example2 from "../assets/img/stay_demo_img/2_2.png"
import img_example3 from "../assets/img/stay_demo_img/3_2.png"
import img_example4 from "../assets/img/stay_demo_img/2_1.png"
import img_example5 from "../assets/img/stay_demo_img/1_1.png"

const images = [
    {
        original: img_example1,
        thumbnail: img_example1,
    },
    {
        original: img_example2,
        thumbnail: img_example2,
    },
    {
        original: img_example3,
        thumbnail: img_example3,
    },
    {
        original: img_example4,
        thumbnail: img_example4,
    },
    {
        original: img_example5,
        thumbnail: img_example5,
    },
]

export function StayPreview({ stay }) {
    // const images = stay.imgUrls.map(url => ({
    //     original: url,
    //     thumbnail: url 
    // }));

    const handleSvgClick = (event) => { //set the btn inside a stay-imgs to work
        event.preventDefault();
        console.log("SVG element clicked")
    }

    const isSvgElement = (element) => {     // check if the element is button, then allow to press.      
        return element instanceof SVGElement || element.tagName.toLowerCase() === "svg"
    }

    return (
        <div className="stay-preview">
            <Link to={`/stay/${stay._id}`}>
                <div className="stay-photo-gallery" onClick={(event) => {
                    // Check if the clicked element or its parent is an SVG element
                    if (isSvgElement(event.target) || isSvgElement(event.target.parentElement)) {
                        handleSvgClick(event);
                    }
                }}>
                    <ImageGallery
                        items={images}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showThumbnails={false}
                        showBullets={true} />
                </div>

                <div className="stay-preview-information">
                    <span className="name-info">{stay.name}</span>
                    <span className="loc-info">{stay.loc.country}-{stay.loc.city}-{stay.loc.address}</span>
                    <span className="price-info">${stay.price} <a>night</a></span>
                </div>
            </Link>
        </div>
    );
}
