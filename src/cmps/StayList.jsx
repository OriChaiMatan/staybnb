import { StayPreview } from "./StayPreview";
import { useState } from "react";

export function StayList({ stays, onUpdateStay }) {
    return (
        <ul className="stay-list">
            {stays.map((stay) => (
                <li key={stay._id}>
                    <StayPreview stay={stay} onUpdateStay={onUpdateStay} />
                </li>
            ))}
        </ul>
    )
}
