import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { stayService } from "../services/stay.service"

import { AboutThisPlaceModel } from "../cmps/stay-details/AboutThisPlaceModel"
import { ReservationModal } from "../cmps/ReservationModal"

import { FaStar } from "react-icons/fa"
import { MdOutlineNavigateNext } from "react-icons/md"

import stayImg from "../assets/img/stay_demo_img/2_1.png"


export function StayDetails() {
    const [stay, setStay] = useState(null)
    const params = useParams()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadStay()
        console.log("params: ", params)
    }, [params.stayId])

    async function loadStay() {
        try {
            const stayData = await stayService.getById(params.stayId);
            const avgRating = calculateAvgRating(stayData.reviews);
            stayData.avgRating = avgRating.toFixed(2);
            setStay(stayData);
        } catch (err) {
            console.log('Error in loadStay', err)
        }
    }

    function calculateAvgRating(reviews) {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0);
        return totalRating / reviews.length;
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
                <h1>{stay.name}</h1>
                <img src={stayImg} alt="" style={{height: '500px', width: '900px'}}/>
                <span>{stay.type} in {stay.loc.city}, {stay.loc.country}</span>
                <span className="stay-capacity">{stay.capacity} guests • {stay.bedroom} bedroom • {stay.beds} bed • {stay.bath} bath</span>
                <span><FaStar /> {stay.avgRating}   <a>{stay.reviews.length} reviews</a></span>
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