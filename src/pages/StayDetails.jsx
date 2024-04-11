import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { stayService } from "../services/stay.service"
import PhotoAlbum from "react-photo-album"

import { AboutThisPlaceModel } from "../cmps/stay-details/AboutThisPlaceModel"
import { ReservationModal } from "../cmps/ReservationModal"

import { MdOutlineNavigateNext } from "react-icons/md"

import stayImg from "../assets/img/stay_demo_img/2_1.png"

import Heart from "../svg/HeartSvg"
import Share from "../svg/ShareSvg"
import Star from "../svg/StarSvg"
import { utilService } from "../services/util.service"


export function StayDetails({ largeMainFilter, setLargeMainFilter }) {
    const [stay, setStay] = useState(null)
    const params = useParams()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadStay()

        function handleScroll() {
            const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
            if (scrollTop > 30) {
                setLargeMainFilter(true);
            } else {
                setLargeMainFilter(false);
            }
        }

        handleScroll();

    }, [params.stayId])

    async function loadStay() {
        try {
            const stayData = await stayService.getById(params.stayId)
            const avgRating = utilService.calculateAvgRating(stayData.reviews)
            setStay(stayData)
        } catch (err) {
            console.log('Error in loadStay', err)
        }
    }

    function toggleModal() {
        setShowModal(!showModal)
    }

    function closeModal() {
        setShowModal(false)
    }


    if (!stay) {
        return <div>Loading...</div>;
    }

    return (
        <section className="stay-details">
            <div className="stay-info">
                <div className="stay-info-header">
                    <h1 className="title">{stay.name}</h1>
                    <div className="action-button">
                        <div className="share">
                            <Share />
                            <div>Share</div >
                        </div>
                        <div className="heart">
                            <Heart />
                            <div>Save</div>
                        </div>

                    </div>
                </div>

                {/* <img className="stay-img" src={stayImg} alt="stay-img" /> */}
                {stay.imgUrls && (
                    <PhotoAlbum layout="rows" photos={stay.imgUrls.map(url => ({ src: url, width: 800, height: 800 }))} />
                )}


                <div className="stay-info-content">

                    <h1 className="location">{stay.type} in {stay.loc.city}, {stay.loc.country}</h1>
                    <div className="stay-capacity">
                        {stay.capacity === 1 ? '1 guest' : `${stay.capacity} guests`}{' '}•{' '}
                        {stay.bedroom === 1 ? '1 bedroom' : `${stay.bedroom} bedrooms`}{' '}•{' '}
                        {stay.beds === 1 ? '1 bed' : `${stay.beds} beds`}{' '}•{' '}
                        {stay.bath === 1 ? '1 bath' : `${stay.bath} baths`}
                    </div>

                    {/* <div className="rating-container">
                        <div className="star-icon"><Star /></div>
                        {(utilService.calculateAvgRating(stay.reviews) !== '0.00' && utilService.calculateAvgRating(stay.reviews) !== '0.0') && (
                            <>
                                <div className="average-rating">{utilService.calculateAvgRating(stay.reviews)}</div>
                                <div>·</div>
                            </>
                        )}
                        <a className="reviews-count" href="#">{stay.reviews.length} reviews</a>
                    </div> */}

                    <div className="rating-container">
                        <div className="star-icon"><Star /></div>
                        {(stay.reviews.length !== 0) && (
                            <>
                                {(utilService.calculateAvgRating(stay.reviews) !== '0.00' && utilService.calculateAvgRating(stay.reviews) !== '0.0') && (
                                    <>
                                        <div className="average-rating">{utilService.calculateAvgRating(stay.reviews)}</div>
                                        <div>·</div>
                                    </>
                                )}
                                <a className="reviews-count" href="#">{stay.reviews.length} reviews</a>
                            </>
                        )}
                        {(stay.reviews.length === 0) && (
                            <span className="no-reviews">No reviews yet</span>
                        )}
                    </div>

                </div>

                <div className="black-br"></div>

                <div className="hosted-by">
                    <img src={stay.host.imgUrl} />
                    <span>Hosted by {stay.host.fullname}</span>
                </div>


                <div className="black-br"></div>
                <p>{stay.summary}</p>
                <span><a onClick={toggleModal}>Show more <MdOutlineNavigateNext /></a></span>
            </div>
            {/* <div><ReservationModal stay={stay}/></div> */}
            {showModal && (<AboutThisPlaceModel summary={stay.summary} onClose={closeModal} />)}
        </section>
    )
}