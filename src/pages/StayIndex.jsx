import { useState, useEffect } from "react"
import { stayService } from "../services/stay.service"
import { StayList } from "../cmps/StayList"
import { LabelsFilter } from "../cmps/LabelsFilter"
import { Outlet, useParams } from "react-router-dom"


export function StayIndex() {
    const [stays, setStays] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadStays()
    }, []);

    async function loadStays() {
        try {
            const stays = await stayService.query()
            setStays(stays)
        } catch (err) {
            console.log('Error in loadStays', err)
        }
    }

    const isStayIndexPage = location.pathname === '/'

    if (!stays) return <div>Loading..</div>

    return (
        <div className="stay-index">
            <StayList stays={stays} />
        </div>
    )
}