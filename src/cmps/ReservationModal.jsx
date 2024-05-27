import { useEffect, useRef, useState } from "react"
import { GuestsModal } from "./app-header/GuestsModal.jsx"
import starIcon from "../assets/img/star.png"
import { set } from "date-fns"
// import {DatePicker} from "./app-header/DatePicker.jsx"

export function ReservationModal({ stay }) {
    const [selectedDates, setSelectedDates] = useState([])
    const [adultsAmount, setAdultsAmount] = useState(0)
    const [childrenAmount, setChildrenAmount] = useState(0)
    const [infantsAmount, setInfantsAmount] = useState(0)
    const [petsAmount, setPetsAmount] = useState(0)
    const [selectedGuests, setSelectedGuests] = useState(0)
    const [showAddGuests, setShowAddGuests] = useState(false)
    const reservationRef = useRef(null)

    useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        closeGuestModal()
      }
    };

    const handleClickOutside = (event) => {
      if (
        reservationRef.current &&
        !reservationRef.current.contains(event.target)
      ) {
        closeGuestModal()
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress)
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, []);

    function handleDatesChange(dates) {
        setSelectedDates(dates)
    }

    
    // function extractDateDisplay() {
    //     if (selectedDates.length === 2 && selectedDates.every(date => date?.$d instanceof Date)) {
    //         const firstDate = dayjs(selectedDates[0].$d);
    //         const firstMonth = firstDate.format('MMM');
    //         const firstDay = firstDate.format('D');

    //         const secondDate = dayjs(selectedDates[1].$d);
    //         const secondMonth = secondDate.format('MMM');
    //         const secondDay = secondDate.format('D');

    //         return [firstMonth, firstDay, secondMonth, secondDay];
    //     }
    //     return []
    // }

    function toggleGuestModal(){
        setShowAddGuests(prev => !prev)
    }

    function closeGuestModal(){
        setShowAddGuests(false)
    }

    function handleAmountChange(type, operation) {
        switch (type) {
            case 'adults':
                setAdultsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'children':
                setChildrenAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'infants':
                setInfantsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            case 'pets':
                setPetsAmount(prevAmount => operation === 'increment' ? prevAmount + 1 : (prevAmount > 0 ? prevAmount - 1 : 0));
                break;
            default:
                break;
        }
        setSelectedGuests(prev => {
            if (operation === 'increment') {
                return prev + 1;
            } else {
                return prev > 0 ? prev - 1 : 0;
            }
        });
    }

    return (
        // <section className="reservation-modal">
        //     <span>${stay.price} <a>night</a></span>
        //     <section className='add-dates-modal'>
        //         <DatePicker onDatesChange={handleDatesChange} />
        //     </section>
        //     {showAddGuests && <section className="add-guests">
        //         <GuestsModal
        //             adultsAmount={adultsAmount}
        //             childrenAmount={childrenAmount}
        //             infantsAmount={infantsAmount}
        //             petsAmount={petsAmount}
        //             handleAmountChange={handleAmountChange}
        //         />
        //     </section>}
        //     <section className="reserve-action">
        //         <button className="reserve-btn">Reserve</button>
        //         <span>You won't be charged yet</span>
        //     </section>
        //     <section className="reservation-summary">
        //         <span>${stay.price} x {selectedDates.length} night</span>
        //         <div className="black-br"></div>
        //         <span>Total</span>
        //         <span>${stay.price*selectedDates.length}</span>
        //     </section>
        // </section>
        <section className="order-container" ref={reservationRef}>
            <div className="order-form-header">
                <p><span className="cost">$40</span> night</p>
                <p className="rate bold-font">
                    <img src={starIcon} alt="star icon" className="star-icon"/>
                    5 •  
                    <span className="reviews"> 1 review</span>
                </p>
            </div>
            <div className="order-form">
                <div className="date-picker">
                    <div className="date-input">
                        <label>CHECK-IN</label>
                        <input placeholder="Add date"/>
                        
                    </div>
                    <div className="date-input">
                        <label>CHECK-OUT</label>
                        <input placeholder="Add date"/>
                    </div>
                </div>
                <div className="guest-input" onClick={toggleGuestModal}>
                    <label>GUESTS</label>
                    <input placeholder="Add guest" value={selectedGuests >= 1 ? `${selectedGuests} ${selectedGuests === 1 ? 'guest' : 'guests'}` : ''} />
                    <svg viewBox="0 0 320 512" width="100" title="angle-down"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                </div>
                {showAddGuests &&
                 <GuestsModal
                 adultsAmount={adultsAmount}
                 childrenAmount={childrenAmount}
                 infantsAmount={infantsAmount}
                 petsAmount={petsAmount}
                 handleAmountChange={handleAmountChange}
                 />}
            </div>  
            <button className="btn-container">
                Reserve
            </button>
            <p className="text-center">
                You Won't be charged yet
            </p>
            {(selectedGuests > 0 || (selectedDates[0] && selectedDates[1])) && <section>
                <section className="price-info">
                    <div className="price-per-night flex space-between">
                        <p className="underline">$40 X 0 nights</p>
                        <p>$0</p>
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
                    <p>$18.15</p>
                </div>
            </section>}
        </section>
    )
}