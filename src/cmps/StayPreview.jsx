import { Link } from "react-router-dom";

export function StayPreview({ stay }) {
    return (
        <div className="stay-preview">
            <Link to={`/stay/${stay._id}`}>
                <div className="stay-preview-content">
                    <img src={stay.imgUrls} alt="" />
                    <span>{stay.name}</span>
                    <span>${stay.price} per night</span>
                </div>
            </Link>
        </div>
    );
}
