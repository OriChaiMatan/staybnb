export function AboutThisPlaceModel({ summary, onClose }) {
    return (
        <div className="about-place-modal">
            <div>
                <button onClick={onClose}>x</button>
                <h1>About this space</h1>
                <p>{summary}</p>
            </div>
        </div>
    )
}