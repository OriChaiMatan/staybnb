import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { stayService } from "../services/stay.service";

import { AboutThisPlaceModel } from "../cmps/AboutThisPlaceModel";
import { ReservationModal } from "../cmps/ReservationModal";

import { MdOutlineNavigateNext } from "react-icons/md";

import Heart from "../svg/HeartSvg";
import Share from "../svg/ShareSvg";
import Star from "../svg/StarSvg";
import SelfCheackIn from "../svg/SelfCheckIn";
import Cancel from "../svg/CancelSvg";
import Workspace from "../svg/WorkspaceSvg";
import { utilService } from "../services/util.service";

import WifiSvg from "../svg/amenities/WifiSvg";
import KitchenSvg from "../svg/amenities/KitchenSvg";
import WasherSvg from "../svg/amenities/WasherSvg";
import DryerSvg from "../svg/amenities/DryerSvg";
import AirConditioningSvg from "../svg/amenities/AirConditioningSvg";
import HeatingSvg from "../svg/amenities/HeatingSvg";
import TVSvg from "../svg/amenities/TvSvg";
import IronSvg from "../svg/amenities/IronSvg";

import PoolSvg from "../svg/amenities/PoolSvg"
import PetsAllowedSvg from "../svg/amenities/PetsAllowedSvg"
import FreeParkingSvg from "../svg/amenities/FreeParkingSvg"
import GymSvg from "../svg/amenities/GymSvg"
import SmokingAllowedSvg from "../svg/amenities/SmokingAllowedSvg"
import BBQGrillSvg from "../svg/amenities/BBQGrillSvg"
import { StayMap } from "../cmps/StayMap"
import StarReview from "../svg/StarReview"
import CleanlinessSvg from "../svg/rating/CleanlinessSvg"
import AccuracySvg from "../svg/rating/AccuracySvg"
import CheckinSvg from "../svg/rating/CheckinSvg"
import CommunicationSvg from "../svg/rating/CommunicationSvg"
import LocationSvg from "../svg/rating/LocationSvg"
import ValueSvg from "../svg/rating/ValueSvg"
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
  };

  useEffect(() => {
    loadStay();
    function handleScroll() {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
          ((document.documentElement && document.documentElement.scrollTop) ||
            0);
      if (scrollTop > hostedByRef.current.offsetTop) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [params.stayId]);

  useEffect(() => {
    if (hostedByRef.current) {
      const observer = new IntersectionObserver(onObserved);

      observer.observe(hostedByRef.current);

      return () => {
        if (hostedByRef.current) {
          observer.unobserve(hostedByRef.current);
        }
      };
    }

    function onObserved(entries) {
      entries.forEach((entry) => {
        const stickyHeader = document.querySelector(".sticky-header");
        if (stickyHeader) {
          stickyHeader.style.position = entry.isIntersecting
            ? "static"
            : "fixed";
        }
      });
    }
  }, [hostedByRef.current]);

  useEffect(() => {
    if (locationRef.current) {
      const observer = new IntersectionObserver(onReviewsObserved, {
        rootMargin: "0px 0px -20% 0px",
      });

      observer.observe(locationRef.current);

      return () => {
        if (locationRef.current) {
          observer.unobserve(locationRef.current);
        }
      };
    }

    function onReviewsObserved(entries) {
      entries.forEach((entry) => {
        setShowReviewsButton(entry.isIntersecting);
      });
    }
  }, [locationRef.current]);

  async function loadStay() {
    try {
      const stayData = await stayService.getById(params.stayId)
      // const avgRating = utilService.calculateAvgRating(stayData.reviews)
      setStay(stayData)
    } catch (err) {
      console.log("Error in loadStay", err);
    }
  }

  function handleDatesChange(dates) {
    setSelectedDates(dates)
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleNavigation(section) {
    let ref;
    switch (section) {
      case "photos":
        ref = photosRef;
        break;
      case "amenities":
        ref = amenitiesRef;
        break;
      case "reviews":
        ref = reviewsRef;
        break;
      case "location":
        ref = locationRef;
        break;
      default:
        return;
    }
    window.scrollTo({
      top: ref.current.offsetTop - 50, // Adjust this value as needed
      behavior: "smooth",
    });
  }

  if (!stay) {
    return <div>Loading...</div>;
  }

  function generateStars(rating) {
    return Array.from({ length: 5 }, (_, index) => (
      <StarReview key={index} filled={index < rating} />
    ));
  }

  function calculateDaysBetween(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const diffInMilliseconds = endDate - startDate;

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInDays = diffInMilliseconds / millisecondsPerDay;

    return Math.ceil(diffInDays);
  }

  return (
    <section className="stay-details">
      {showStickyHeader && (
        <StickyHeader
          stay={stay}
          onNavigate={handleNavigation}
          showButton={showReviewsButton}
        />
      )}
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

      <div ref={photosRef} className="stay-info-imgs">
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

          <div ref={hostedByRef} className="hosted-by">
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

          <section ref={amenitiesRef} className="amenities-details">
            <h2>What this place offers</h2>
            <div className="offers-grid">
              {stay.amenities.map((amenity, index) => {
                const amenityKey = amenity.replace(/\s+/g, "_");
                return (
                  <div key={index} className="offer">
                    {amenityIcons[amenityKey]}
                    {amenity}
                  </div>
                );
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
          <ReservationModal
            stay={stay}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            calculateDaysBetween={calculateDaysBetween}
          />
        </section>
      </section>

      <section ref={reviewsRef} className="reviews">
        <header className="header-reviews">
          <div className="reviews-rate">
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
          </div>

          <section className="rating">
            <div className="overall-rating">
              <span>Overall rating</span>
              <div className="progress">
                <div className="rating-progress">
                  5<progress max="5" value="4.6"></progress>
                </div>
                <div className="rating-progress">
                  4<progress max="5" value="4.1"></progress>
                </div>
                <div className="rating-progress">
                  3<progress max="5" value="0"></progress>
                </div>
                <div className="rating-progress">
                  2<progress max="5" value="0"></progress>
                </div>
                <div className="rating-progress">
                  1<progress max="5" value="0"></progress>
                </div>
              </div>
            </div>

            <div className="rating-detail">
              <div className="rating-item">
                <div className="rating-info">
                  <span>Cleanliness</span>
                  <div>4.9</div>
                </div>
                <CleanlinessSvg />
              </div>

              <div className="rating-item">
                <div className="rating-info">
                  <span>Accuracy</span>
                  <div>4.8</div>
                </div>
                <AccuracySvg />
              </div>

              <div className="rating-item">
                <div className="rating-info">
                  <span>Check-in</span>
                  <div>4.9</div>
                </div>
                <CheckinSvg />
              </div>

              <div className="rating-item">
                <div className="rating-info">
                  <span>Communication</span>
                  <div>5.0</div>
                </div>
                <CommunicationSvg />
              </div>

              <div className="rating-item">
                <div className="rating-info">
                  <span>Location</span>
                  <div>5.0</div>
                </div>
                <LocationSvg />
              </div>

              <div className="rating-item">
                <div className="rating-info">
                  <span>Value</span>
                  <div>4.8</div>
                </div>
                <ValueSvg />
              </div>
            </div>
          </section>
        </header>

        <section className="guest-reviews-container">
          {stay.reviews.map((review) => (
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
                <div className="star-review">{generateStars(review.rate)}</div>
                <div>·</div>
                <div className="date-review">{review.date}</div>
              </div>

              <div className="review-txt">{review.txt}</div>
            </article>
          ))}
        </section>
      </section>

      <div ref={locationRef} className="map">
        <h3>Where you’ll be</h3>
        <h4>
          {stay.loc.city}, {stay.loc.country}
        </h4>
        <StayMap lat={stay.loc.lat} lng={stay.loc.lng} />
      </div>
    </section>
  );
}
