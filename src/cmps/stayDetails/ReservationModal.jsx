import { useEffect, useRef, useState } from "react";
import { GuestsModal } from "../app-header/GuestsModal.jsx";
import starIcon from "../../assets/img/star.png";
import { CalendarPicker } from "../CalendarPicker.jsx";
import { format } from "date-fns";

export function ReservationModal({
  stay,
  selectedRange,
  setRange,
  calculateDaysBetween,
  hoveredDate,
  setHoveredDate,
}) {
  const [adultsAmount, setAdultsAmount] = useState(0);
  const [childrenAmount, setChildrenAmount] = useState(0);
  const [infantsAmount, setInfantsAmount] = useState(0);
  const [petsAmount, setPetsAmount] = useState(0);
  const [selectedGuests, setSelectedGuests] = useState(0);
  const [showAddGuests, setShowAddGuests] = useState(false);
  const [showAddDates, setShowAddDates] = useState(false);
  const reservationRef = useRef(null);

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        closeModals();
      }
    };

    const handleClickOutside = (event) => {
      if (
        reservationRef.current &&
        !reservationRef.current.contains(event.target)
      ) {
        closeModals();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleGuestModal() {
    setShowAddGuests((prev) => !prev);
  }

  function toggleDatesModal() {
    setShowAddDates((prev) => !prev);
    if (showAddGuests) {
      setShowAddGuests(false);
    }
  }

  function closeModals() {
    setShowAddGuests(false);
    setShowAddDates(false);
  }

  function handleAmountChange(type, operation) {
    switch (type) {
      case "adults":
        setAdultsAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
            ? prevAmount - 1
            : 0
        );
        break;
      case "children":
        setChildrenAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
            ? prevAmount - 1
            : 0
        );
        break;
      case "infants":
        setInfantsAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
            ? prevAmount - 1
            : 0
        );
        break;
      case "pets":
        setPetsAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
            ? prevAmount - 1
            : 0
        );
        break;
      default:
        break;
    }
    setSelectedGuests((prev) => {
      if (operation === "increment") {
        return prev + 1;
      } else {
        return prev > 0 ? prev - 1 : 0;
      }
    });
  }

  function averageReviewsScore() {
    const reviews = stay.reviews;
    const totalScore = reviews.reduce((acc, review) => acc + review.rate, 0);
    return (totalScore / reviews.length).toFixed(2);
  }

  const totalNights =
    selectedRange.start && selectedRange.end
      ? calculateDaysBetween(selectedRange.start, selectedRange.end)
      : 0;

  const totalPrice = stay.price * totalNights;

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
                  ? selectedRange.start.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })
                  : ""
              }
            />
          </div>
          <div className="date-input" onClick={toggleDatesModal}>
            <label>CHECK-OUT</label>
            <input
              placeholder="Add date"
              value={
                selectedRange.start && selectedRange.end
                  ? selectedRange.end.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })
                  : ""
              }
            />
          </div>
        </div>
        {showAddDates && (
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
                ? `${selectedGuests} ${
                    selectedGuests === 1 ? "guest" : "guests"
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
      <button className="btn-container">Reserve</button>
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
  );
}
