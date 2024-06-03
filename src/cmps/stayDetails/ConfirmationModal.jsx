import React, { useState } from 'react'
import { HiCheckCircle } from "react-icons/hi2"

export default function ConfirmationModal({ onClose, startDate, endDate, adultsAmount, childrenAmount, infantsAmount, petsAmount, stay, totalNights, totalPrice }) {
    const [isConfirmed, setIsConfirmed] = useState(false)

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
    }

    const stayImg = stay.imgUrls[0].imgUrl

    function handleConfirm() {
        setIsConfirmed(true)
    }

    return (
        <div className="confirmation-modal">
            <div className='confirmation-modal-content'>

                {isConfirmed ? (
                    <header>
                        <div className='header-success'>
                            <HiCheckCircle className='icon-success' />
                            <h1 className='title-success'>Reserved successfully</h1>
                        </div>

                        <p className='txt-success'>You can follow the order status in My trips page</p>
                    </header>
                ) : (
                    <header>
                        <h2>One last stop</h2>
                        <p>Dear Guest,</p>
                        <p>In order to complete your reservation, please confirm your trip details.</p>
                    </header>
                )}

                <div className='reservation-main'>
                    <div className="reservation-details">
                        <h3>Reservation details</h3>

                        <h4 className='title'>Trip dates:</h4>
                        <div className='content'>
                            <span>{formatDate(startDate)}</span>
                            <span>-</span>
                            <span>{formatDate(endDate)}</span>
                        </div>

                        <h4 className='title'>Guests:</h4>
                        <div className='content guest'>
                            {adultsAmount > 0 && `${adultsAmount} ${adultsAmount === 1 ? 'adult' : 'adults'}`}{' '}
                            {childrenAmount > 0 && `${childrenAmount} ${childrenAmount === 1 ? 'child' : 'children'}`}{' '}
                            {infantsAmount > 0 && `${infantsAmount} ${infantsAmount === 1 ? 'infant' : 'infants'}`}{' '}
                            {petsAmount > 0 && `${petsAmount} ${petsAmount === 1 ? 'pet' : 'pets'}`}
                        </div>

                        <h4 className='title-price'>Price Details</h4>
                        <div className='price-line'>
                            <div>${stay.price} X {totalNights} nights </div>
                            <div>${totalPrice}</div>
                        </div>
                        <div className='price-line'>
                            <div className='content'>Cleaning fee</div>
                            <div>$10</div>
                        </div>
                        <div className='price-line last-line'>
                            <div className='content'>Service fee </div>
                            <div>$8.15</div>
                        </div>
                        <div className='price-line total-price'>
                            <div>Total</div>
                            <div>{totalPrice + 10 + 8.15}</div>
                        </div>
                    </div>



                    <div className='img-content'>
                        <img src={stayImg} className='rounded-img'></img>
                        <div className='loc'>{stay.name}</div>
                        <div className='loc'>{stay.loc.city}, {stay.loc.country}</div>
                    </div>
                </div>


                {!isConfirmed ? (
                    <div className='btns-container'>
                        <button className="btn back-btn" onClick={onClose}>Back</button>
                        <button className="btn confirm-btn" onClick={handleConfirm}>Confirm</button>
                    </div>
                ) : (
                    <div className='btns-container'>
                        <button className="btn back-btn" onClick={onClose}>Close</button>
                    </div>
                )}
            </div>
        </div>
    )
}

