import { IoClose } from "react-icons/io5"

export function AboutThisPlaceModel({ summary, onClose }) {
    return (
        <div className="about-place-modal">
            <div className="modal-content">
                <button onClick={onClose}><IoClose /></button>
                <h1>About this space</h1>
                <p>{summary}</p>
            </div>
        </div>
    )
}