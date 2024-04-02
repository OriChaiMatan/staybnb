import { useState, useEffect } from "react";
import { stayService } from "../services/stay.service";
import { StayList } from "../cmps/StayList";

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
        <div className="stay-index">
            <StayList stays={stays} />
        </div>
    );
}