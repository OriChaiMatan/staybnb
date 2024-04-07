import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { StayList } from "../cmps/StayList"
import {LabelsFilter} from "../cmps/LabelsFilter"

export function StayIndex() {
    const [stays, setStays] = useState(null)

    useEffect(() => {
        loadStays()
    }, []);

    async function loadStays() {
        try {
            const stays = await stayService.query()
            setStays(stays);
        } catch (err) {
            console.log('Error in loadStays', err)
        }
    }

    if (!stays) return <div>Loading..</div>

    return (
        <div className="stay-index">
            <LabelsFilter />
            <StayList stays={stays} />
            <Outlet context={{ title: 'hi' }} />
        </div>
    );
}