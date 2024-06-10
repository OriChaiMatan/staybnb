import { StayPreview } from "./StayPreview";
import { useState } from "react";

export function StayList({ stays, onUpdateStay }) {
    const [staysState, setStaysState] = useState(stays);

    const handleUpdateStay = (updatedStay) => {
        const updatedStays = staysState.map(stay =>
            stay._id === updatedStay._id ? updatedStay : stay
        );
        setStaysState(updatedStays);
        onUpdateStay(updatedStay);
    }

    return (
        <ul className="stay-list">
            {staysState.map((stay) => (
                <li key={stay._id}>
                    <StayPreview stay={stay} onUpdateStay={handleUpdateStay} />
                </li>
            ))}
        </ul>
    )
}
