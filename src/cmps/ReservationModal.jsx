import { useState } from "react"
import { GuestsModal } from "./app-header/GuestsModal.jsx"
import DatePicker from "./app-header/DatePicker.jsx"

export function ReservationModal({ stay }) {
    const [selectedDates, setSelectedDates] = useState([])
    const [adultsAmount, setAdultsAmount] = useState(0)
    const [childrenAmount, setChildrenAmount] = useState(0)
    const [infantsAmount, setInfantsAmount] = useState(0)
    const [petsAmount, setPetsAmount] = useState(0)
    const [selectedGuests, setSelectedGuests] = useState(0)

    function handleDatesChange(dates) {
        setSelectedDates(dates);
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
        <section className="reservation-modal">
            <span>${stay.price} <a>night</a></span>
            <section className='add-dates-modal'>
                <DatePicker onDatesChange={handleDatesChange} />
            </section>
            <section className="add-guests">
                <GuestsModal
                    adultsAmount={adultsAmount}
                    childrenAmount={childrenAmount}
                    infantsAmount={infantsAmount}
                    petsAmount={petsAmount}
                    handleAmountChange={handleAmountChange}
                />
            </section>
            <section className="reserve-action">
                <button className="reserve-btn">Reserve</button>
                <span>You won't be charged yet</span>
            </section>
            <section className="reservation-summary">
                <span>${stay.price} x {selectedDates.length} night</span>
                <div className="black-br"></div>
                <span>Total</span>
                <span>${stay.price*selectedDates.length}</span>
            </section>
        </section>
    )
}