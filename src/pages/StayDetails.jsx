import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { stayService } from "../services/stay.service"

import { AboutThisPlaceModel } from "../cmps/AboutThisPlaceModel"
import { ReservationModal } from "../cmps/ReservationModal"

import { MdOutlineNavigateNext } from "react-icons/md"

import Heart from "../svg/HeartSvg"
import Share from "../svg/ShareSvg"
import Star from "../svg/StarSvg"
import SelfCheackIn from "../svg/SelfCheckIn"
import Cancel from "../svg/CancelSvg"
import Workspace from "../svg/WorkspaceSvg"
import { utilService } from "../services/util.service"

import WifiSvg from "../svg/amenities/WifiSvg"
import KitchenSvg from "../svg/amenities/KitchenSvg"
import WasherSvg from "../svg/amenities/WasherSvg"
import DryerSvg from "../svg/amenities/DryerSvg"
import AirConditioningSvg from "../svg/amenities/AirConditioningSvg"
import HeatingSvg from "../svg/amenities/HeatingSvg"
import TVSvg from "../svg/amenities/TvSvg"
import IronSvg from "../svg/amenities/IronSvg"

import PoolSvg from "../svg/amenities/PoolSvg"
import PetsAllowedSvg from "../svg/amenities/PetsAllowedSvg"
import FreeParkingSvg from "../svg/amenities/FreeParkingSvg"
import GymSvg from "../svg/amenities/GymSvg"
import SmokingAllowedSvg from "../svg/amenities/SmokingAllowedSvg"
import BBQGrillSvg from "../svg/amenities/BBQGrillSvg"
import { StayMap } from "../cmps/StayMap"
import StarReview from "../svg/StarReview"
StarReview
// import {DatePicker} from "../cmps/app-header/DatePicker";

export function StayDetails({ setLargeMainFilter }) {
  const [stay, setStay] = useState(null)
  const params = useParams()
  const [showModal, setShowModal] = useState(false)
  const [selectedDates, setSelectedDates] = useState([])

  const amenityIcons = {
    Wifi: <WifiSvg />,
    Kitchen: <KitchenSvg />,
    Washer: <WasherSvg />,
    Dryer: <DryerSvg />,
    Air_conditioning: <AirConditioningSvg />,
    Heating: <HeatingSvg />,
    TV: <TVSvg />,
    Iron: <IronSvg />,
    Pool: <PoolSvg />,
    Pets_allowed: <PetsAllowedSvg />,
    Free_parking: <FreeParkingSvg />,
    Gym: <GymSvg />,
    Smoking_allowed: <SmokingAllowedSvg />,
    BBQ_Grill: <BBQGrillSvg />,
  }

  useEffect(() => {
    loadStay()
    function handleScroll() {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) ||
          0);
      if (scrollTop > 30) {
        setLargeMainFilter(true)
      } else {
        setLargeMainFilter(false)
      }
    }

    handleScroll()
  }, [params.stayId])

  async function loadStay() {
    try {
      const stayData = await stayService.getById(params.stayId)
      // const avgRating = utilService.calculateAvgRating(stayData.reviews)
      setStay(stayData)
    } catch (err) {
      console.log("Error in loadStay", err)
    }
  }

  function handleDatesChange(dates) {
    setSelectedDates(dates)
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


  function generateStars(rating) {
    return Array.from({ length: 5 }, (_, index) => (
      <StarReview key={index} filled={index < rating} />
    ))
  }




  return (
    <section className="stay-details">
      <header className="stay-info-header">
        <h1 className="title">{stay.name}</h1>
        <div className="action-button">
          <div className="share">
            <Share />
            <div>Share</div>
          </div>
          <div className="heart">
            <Heart />
            <div>Save</div>
          </div>
        </div>
      </header>

      <div className="stay-info-imgs">
        {stay.imgUrls.slice(0, 5).map((url, index) => (
          <img
            key={index}
            src={url.imgUrl}
            alt={`Image ${index + 1}`}
            className={`grid-item-${index}`}
          />
        ))}
      </div>

      <section className="details-container">
        <div className="stay-ferrites">
          <div className="stay-info-content">
            <h1 className="location">
              {stay.type} in {stay.loc.city}, {stay.loc.country}
            </h1>
            <div className="stay-capacity">
              {stay.capacity === 1 ? "1 guest" : `${stay.capacity} guests`} •{" "}
              {stay.bedroom === 1 ? "1 bedroom" : `${stay.bedrooms} bedrooms`} •{" "}
              {stay.beds === 1 ? "1 bed" : `${stay.beds} beds`} •{" "}
              {stay.bath === 1 ? "1 bath" : `${stay.bath} baths`}
            </div>

            <section className="rating-container">
              <Star />
              {stay.reviews.length !== 0 && (
                <>
                  {utilService.calculateAvgRating(stay.reviews) !== "0.00" &&
                    utilService.calculateAvgRating(stay.reviews) !== "0.0" && (
                      <>
                        <div className="average-rating">
                          {utilService.calculateAvgRating(stay.reviews)}
                        </div>
                        <div>·</div>
                      </>
                    )}
                  <a className="reviews-count" href="#">
                    {stay.reviews.length} reviews
                  </a>
                </>
              )}
              {stay.reviews.length === 0 && (
                <span className="no-reviews">No reviews yet</span>
              )}
            </section>
          </div>

          <div className="hosted-by">
            <img
              className="hosted-img"
              src={stay.host.imgUrl}
              alt={`Hosted by ${stay.host.fullname}`}
            />
            <span>Hosted by {stay.host.fullname}</span>
          </div>

          <section className="ferrites-main">
            <div className="line">
              <SelfCheackIn />
              <div className="text">
                <h4>Self check-in</h4>
                <p>Check yourself in with the lockbox.</p>
              </div>
            </div>
            <div className="line">
              <Workspace />
              <div className="text">
                <h4>Dedicated workspace</h4>
                <p>
                  Dedicated workspace A room with wifi that’s well-suited for
                  working.
                </p>
              </div>
            </div>
            <div className="line">
              <Cancel />
              <div className="text">
                <h4>Free cancellation for 48 hours</h4>
              </div>
            </div>
          </section>

          <article className="summery">
            <div className="text-summery">{stay.summary}</div>
            <a className="show-more" onClick={toggleModal}>
              Show more <MdOutlineNavigateNext />
            </a>
            {showModal && (
              <AboutThisPlaceModel
                summary={stay.summary}
                onClose={closeModal}
              />
            )}
          </article>

          <section className="amenities-details">
            <h2>What this place offers</h2>
            <div className="offers-grid">
              {stay.amenities.map((amenity, index) => {
                const amenityKey = amenity.replace(/\s+/g, "_")
                return (
                  <div key={index} className="offer">
                    {amenityIcons[amenityKey]}
                    {amenity}
                  </div>
                )
              })}
            </div>
          </section>

          <section className="dates">
            <h1>Select check-in date</h1>
            <h4>Add your travel dates for exact pricing</h4>

            {/* <DatePicker onDatesChange={handleDatesChange} /> */}
          </section>


        </div>

        <section className="reservation-modal">
          <ReservationModal stay={stay} />
        </section>

      </section>

      <section className="reviews">

        <header className="header-reviews">
          <Star />
          {stay.reviews.length !== 0 && (
            <>
              {utilService.calculateAvgRating(stay.reviews) !== "0.00" &&
                utilService.calculateAvgRating(stay.reviews) !== "0.0" && (
                  <>
                    <div className="average-rating">
                      {utilService.calculateAvgRating(stay.reviews)}
                    </div>
                    <div>·</div>
                  </>
                )}
              {stay.reviews.length} reviews
            </>
          )}
          {stay.reviews.length === 0 && (
            <span className="no-reviews">No reviews yet</span>
          )}
        </header>

        <section className="guest-reviews-container">
          {stay.reviews.map(review => (
            <article className="review" key={review.id}>

              <div className="mini-user">
                <img
                  className="review-img"
                  src={review.by.imgUrl}
                  alt={`img review by ${review.by.fullname}`}
                />
                <div className="mini-user-details">
                  <h3>{review.by.fullname}</h3>
                  <span>{review.by.address}</span>
                </div>

              </div>


              <div className="review-info">
                <div className="star-review">
                  {generateStars(review.rate)}
                </div>
                <div>·</div>
                <div className="date-review">
                  {review.date}
                </div>
              </div>


              <div className="review-txt" >
                {review.txt}
              </div>


            </article>

          ))}
        </section>






      </section>

      <div className="map">
        <h3>Where you’ll be</h3>
        <h4>{stay.loc.city}, {stay.loc.country}</h4>
        <StayMap lat={stay.loc.lat} lng={stay.loc.lng} />
      </div>
    </section>
  )
}
