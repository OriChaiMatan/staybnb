import { useEffect, useRef, useState } from "react";
import { GuestsModal } from "../app-header/GuestsModal.jsx";
import starIcon from "../../assets/img/star.png";
import { CalendarPicker } from "../CalendarPicker.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { orderService } from "../../services/order.service.js";
import { showErrorMsg } from "../../services/event-bus.service.js";
import { utilService } from "../../services/util.service.js";

export function ReservationModal({
  stay,
  selectedRange,
  setRange,
  calculateDaysBetween,
  hoveredDate,
  setHoveredDate,
}) {
  const [adultsAmount, setAdultsAmount] = useState(0)
  const [childrenAmount, setChildrenAmount] = useState(0)
  const [infantsAmount, setInfantsAmount] = useState(0)
  const [petsAmount, setPetsAmount] = useState(0)
  const [selectedGuests, setSelectedGuests] = useState(0)
  const [showAddGuests, setShowAddGuests] = useState(false)
  const [showAddDates, setShowAddDates] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const reservationRef = useRef(null)


  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        closeModals()
      }
    }

    const handleClickOutside = (event) => {
      if (
        reservationRef.current &&
        !reservationRef.current.contains(event.target)
      ) {
        closeModals()
      }
    }

    document.addEventListener("keydown", handleEscapeKeyPress)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress)
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [])

  function closeConfirmationModal() {
    setShowConfirmationModal(false)
  }

  function toggleGuestModal() {
    setShowAddGuests((prev) => !prev)
  }

  function toggleDatesModal() {
    setShowAddDates((prev) => !prev)
    if (showAddGuests) {
      setShowAddGuests(false)
    }
  }

  function closeModals() {
    setShowAddGuests(false)
    setShowAddDates(false)
  }

  function handleAmountChange(type, operation) {
    const stateSetters = {
      adults: setAdultsAmount,
      children: setChildrenAmount,
      infants: setInfantsAmount,
      pets: setPetsAmount,
    }

    const updateAmount = (setter) => {
      setter((prevAmount) =>
        operation === "increment"
          ? prevAmount + 1
          : prevAmount > 0
            ? prevAmount - 1
            : 0
      )
    }

    if (stateSetters[type]) {
      updateAmount(stateSetters[type]);
    }

    setSelectedGuests((prev) =>
      operation === "increment" ? prev + 1 : prev > 0 ? prev - 1 : 0
    )
  }



  function averageReviewsScore() {
    if (stay.reviews.length === 0) return 0
    const reviews = stay.reviews
    const totalScore = reviews.reduce((acc, review) => acc + review.rate, 0)
    return (totalScore / reviews.length).toFixed(2)
  }

  function onReserve() {
    if (!selectedRange.start || !selectedRange.end || selectedGuests < 1) {
      showErrorMsg('Please fill in all the fields')
    }
    else {
      setShowConfirmationModal(true)
    }
  }

  const totalNights = selectedRange.start && selectedRange.end ? calculateDaysBetween(selectedRange.start, selectedRange.end) : 0
  const totalPrice = stay.price * totalNights
  const startDate = selectedRange.start ? utilService.formatDate(selectedRange.start) : null
  const endDate = selectedRange.end ? utilService.formatDate(selectedRange.end) : null

  return (
    <section className="order-container" ref={reservationRef}>
      <div className="order-form-header">
        <p>
          <span className="cost">${stay.price}</span> night
        </p>
        <p className="rate bold-font">
          <img src={starIcon} alt="star icon" className="star-icon" />
          {averageReviewsScore()} •
          <span className="modal-review">
            {" "}
            {stay.reviews.length}{" "}
            {stay.reviews?.length === 0 ? "review" : "reviews"}
          </span>
        </p>
      </div>
      <div className="order-form">
        <div className="date-picker">
          <div className="date-input" onClick={toggleDatesModal}>
            <label>CHECK-IN</label>
            <input
              placeholder="Add date"
              value={
                selectedRange.start && selectedRange.end
                  ? utilService.formatMonthDay(selectedRange.start) : ""
              }
            />
          </div>
          <div className="date-input" onClick={toggleDatesModal}>
            <label>CHECK-OUT</label>
            <input
              placeholder="Add date"
              value={
                selectedRange.start && selectedRange.end
                  ? utilService.formatMonthDay(selectedRange.end) : ""
              }
            />
          </div>
        </div>
        {showAddDates && (!selectedRange.start || !selectedRange.end) && (
          <section className="reservation-dates-modal">
            <CalendarPicker
              range={selectedRange}
              setRange={setRange}
              hoveredDate={hoveredDate}
              setHoveredDate={setHoveredDate}
            />
          </section>
        )}
        <div className="guest-input" onClick={toggleGuestModal}>
          <label>GUESTS</label>
          <input
            placeholder="Add guest"
            value={
              selectedGuests >= 1
                ? `${selectedGuests} ${selectedGuests === 1 ? "guest" : "guests"
                }`
                : ""
            }
            readOnly
          />
          <svg viewBox="0 0 320 512" width="100" title="angle-down">
            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4-9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
          </svg>
        </div>
        {showAddGuests && (
          <GuestsModal
            adultsAmount={adultsAmount}
            childrenAmount={childrenAmount}
            infantsAmount={infantsAmount}
            petsAmount={petsAmount}
            handleAmountChange={handleAmountChange}
          />
        )}
      </div>
      <button className="btn-container" onClick={onReserve}>Reserve</button>
      {showConfirmationModal &&
        <ConfirmationModal
          onClose={closeConfirmationModal}
          startDate={startDate}
          endDate={endDate}
          adultsAmount={adultsAmount}
          childrenAmount={childrenAmount}
          infantsAmount={infantsAmount}
          petsAmount={petsAmount}
          stay={stay}
          totalNights={totalNights}
          totalPrice={totalPrice}
        />}
      <p className="text-center">You Won't be charged yet</p>
      {(selectedGuests > 0 || (selectedRange.start && selectedRange.end)) && (
        <section>
          <section className="price-info">
            <div className="price-per-night flex space-between">
              <p className="underline">
                ${stay.price} X {totalNights} nights
              </p>
              <p>${totalPrice}</p>
            </div>
            <div className="service-fee flex space-between">
              <p className="underline">Cleaning fee</p>
              <p>$10</p>
            </div>
            <div className="service-fee flex space-between">
              <p className="underline">Service fee</p>
              <p>$8.15</p>
            </div>
          </section>
          <div className="total flex space-between">
            <p>Total</p>
            <p>${totalPrice + 10 + 8.15}</p>
          </div>
        </section>
      )}
    </section>
  )
}
