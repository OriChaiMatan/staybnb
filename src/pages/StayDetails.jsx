import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { stayService } from "../services/stay.service"
import { ReservationModal } from "../cmps/stayDetails/ReservationModal"
import { MapContainer } from "../cmps/stayDetails/MapContainer"
import { CalendarPicker } from "../cmps/CalendarPicker"
import { StickyHeader } from "../cmps/stayDetails/StickyHeader"
import { StayHeader } from "../cmps/stayDetails/StayHeader"
import { StayAmenities } from "../cmps/stayDetails/StayAmenities"
import { StaySummary } from "../cmps/stayDetails/StaySummary"
import { StayInfo } from "../cmps/stayDetails/StayInfo"
import { StayReviews } from "../cmps/stayDetails/StayReviews"
import { StayFeatures } from "../cmps/stayDetails/StayFeatures"
import { StayRating } from "../cmps/stayDetails/StayRating"
import { StayImgs } from "../cmps/stayDetails/StayImgs"
import { StayIndexSkeleton } from "../cmps/StayIndexSkeleton"
import { socketService, SOCKET_EVENT_NOTIFY_USER_WATCHING_STAY } from "../services/socket.service"
import { MobileReserve } from "../cmps/stayDetails/MobileReserve"
import { useWindowSize } from "../customHooks/useWindowSize"

export function StayDetails({ setLargeMainFilter }) {
  const [stay, setStay] = useState(null)
  const params = useParams()
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [showReviewsButton, setShowReviewsButton] = useState(false)
  const [hoveredDate, setHoveredDate] = useState(null)

  const photosRef = useRef(null)
  const amenitiesRef = useRef(null)
  const reviewsRef = useRef(null)
  const locationRef = useRef(null)
  const hostedByRef = useRef(null)
  const windowSize = useWindowSize()

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    loadStay()

    function handleScroll() {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) ||
          0);

      if (hostedByRef.current) {
        if (scrollTop > hostedByRef.current.offsetTop) {
          setShowStickyHeader(true)
        } else {
          setShowStickyHeader(false)
        }
      }

      if (reviewsRef.current) {
        if (scrollTop > reviewsRef.current.offsetTop - 200) {
          setShowReviewsButton(true)
        } else {
          setShowReviewsButton(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [params.stayId])


  async function loadStay() {
    try {
      const stayData = await stayService.getById(params.stayId)
      setStay(stayData)
      socketService.emit(SOCKET_EVENT_NOTIFY_USER_WATCHING_STAY, { userName: loggedinUser?.fullname, stayName: stayData.name, hostId: stayData.host._id })
    } catch (err) {
      console.log("Error in loadStay", err)
    }
  }


  function handleNavigation(section) {
    const refs = {
      photos: photosRef,
      amenities: amenitiesRef,
      reviews: reviewsRef,
      location: locationRef,
    }

    const ref = refs[section]
    if (!ref) return

    window.scrollTo({
      top: ref.current.offsetTop - 50,
      behavior: "smooth",
    })
  }

  if (!stay) return <StayIndexSkeleton />


  function calculateDaysBetween(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    const diffInMilliseconds = endDate - startDate

    const millisecondsPerDay = 1000 * 60 * 60 * 24
    const diffInDays = diffInMilliseconds / millisecondsPerDay

    return Math.ceil(diffInDays)
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

      <StayHeader name={stay.name} />

      <div ref={photosRef}>
        <StayImgs imgUrls={stay.imgUrls} />
      </div>

      <section className="details-container">
        <div className="stay-ferrites">
          <StayInfo stay={stay} />

          <div ref={hostedByRef} className="hosted-by">
            <img
              className="hosted-img"
              src={stay.host.imgUrl}
              alt={`Hosted by ${stay.host.fullname}`}
            />
            <span>Hosted by {stay.host.fullname}</span>
          </div>

          <StayFeatures />
          <StaySummary summary={stay.summary} />
          <div className="amenities-details" ref={amenitiesRef}>
            <StayAmenities amenities={stay.amenities} />
          </div>

          <section className="dates">
            {selectedRange.start && selectedRange.end ? (
              <>
                <h1>
                  {selectedRange.start &&
                    selectedRange.end &&
                    calculateDaysBetween(
                      selectedRange.start,
                      selectedRange.end
                    )}{" "}
                  nights in {stay.loc.city}
                </h1>
                <h4>
                  {selectedRange.start.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                  {" - "}
                  {selectedRange.end.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </h4>
              </>
            ) : (
              <>
                <h1>Select check-in date</h1>
                <h4>Add your travel dates for exact pricing</h4>
              </>
            )}

            <CalendarPicker
              range={selectedRange}
              setRange={setSelectedRange}
              hoveredDate={hoveredDate}
              setHoveredDate={setHoveredDate}
            />
          </section>
        </div>

        <section className="reservation-modal">
          <ReservationModal
            stay={stay}
            selectedRange={selectedRange}
            setRange={setSelectedRange}
            calculateDaysBetween={calculateDaysBetween}
            hoveredDate={hoveredDate}
            setHoveredDate={setHoveredDate}
          />
        </section>
      </section>

      <section ref={reviewsRef} className="rating-container">
        <StayRating reviews={stay.reviews} />
        <StayReviews reviews={stay.reviews} />
      </section>

      {stay.loc.lat && <div ref={locationRef} className="map">
        <h3>Where you’ll be</h3>
        <h4>
          {stay.loc.city}, {stay.loc.country}
        </h4>
        <MapContainer lat={stay.loc.lat} lng={stay.loc.lng} />
      </div>}

      {windowSize.width < 780 &&
        <MobileReserve stay={stay} selectedRange={selectedRange} />
      }

    </section>
  )
}
