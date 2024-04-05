import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { stayService } from "../services/stay.service"

import { AboutThisPlaceModel } from "../cmps/stay-details/AboutThisPlaceModel"

import { FaStar } from "react-icons/fa"
import { MdOutlineNavigateNext } from "react-icons/md"


export function StayDetails() {
    const [stay, setStay] = useState(null)
    const params = useParams()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadStay()
    }, [params.id])

    async function loadStay() {
        try {
            const stayData = await stayService.getById(params.id);
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
                <span>{stay.type} in {stay.loc.city}, {stay.loc.country}</span>
                <span className="stay-capacity">{stay.capacity} guests • {stay.bedroom} bedroom • {stay.beds} bed • {stay.bath} bath</span>
                <span><FaStar /> {stay.avgRating}   <a>{stay.reviews.length} reviews</a></span>
                <p>{stay.summary}</p>
                <a onClick={toggleModal}>Show more <MdOutlineNavigateNext /></a>
            </div>
            {showModal && (<AboutThisPlaceModel summary={stay.summary} onClose={closeModal} />)}
        </section>
    )
}