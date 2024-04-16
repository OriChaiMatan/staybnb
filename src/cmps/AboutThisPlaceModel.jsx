
import CloseSvg from "../svg/CloseSvg"


export function AboutThisPlaceModel({ summary, onClose }) {
    return (
        <div className="about-place-modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}> <CloseSvg /></button>
                <div className="txt">
                    <div className="txt-content">
                        <div className="title">About this space</div>
                        <p className="summary">{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}