import React from 'react'

export default function ConfirmationModal() {
    return (
        <div className='about-place-modal'>
            <div className='about-place-modal-content'>
                <h1>Thank you for your reservation!</h1>
                <h4>
                    Your host will be in touch shortly to confirm the details of your stay.
                </h4>
                <button onClick={() => setShowConfirmationModal(false)}>Got it</button>
            </div>
        </div>
    )
}
