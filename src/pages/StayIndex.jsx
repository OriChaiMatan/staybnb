import { NavLink } from "react-router-dom";
import { StayPreview } from "../cmps/StayPreview";
import { useState, useEffect } from "react";
import { stayService } from "../services/stay.service";

export function StayIndex() {
    const [stays, setStays] = useState(null);

    useEffect(() => {
        loadStays();
    }, []);

    async function loadStays() {
        try {
            const stays = await stayService.query();
            setStays(stays);
        } catch (err) {
            console.log('Error in loadStays', err);
        }
    }

    return (
        <div>
            {stays && stays.map(stay => (
                <StayPreview key={stay._id} stay={stay} />
            ))}
        </div>
    );
}