import { useState, useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { StayList } from "../cmps/StayList"
import { LabelsFilter } from "../cmps/LabelsFilter"

export function StayIndex() {
    const [stays, setStays] = useState(null)
    const params = useParams()




    useEffect(() => {
        console.log(params, 'params')
    }, [params])

    useEffect(() => {
        loadStays()
    }, [])

    async function loadStays() {
        try {
            const stays = await stayService.query()
            setStays(stays);
        } catch (err) {
            console.log('Error in loadStays', err)
        }
    }

    async function onAddStay(stay) {
        try {
            const savedStay = await stayService.save(stay)
            loadStays()
        } catch (err) {
            console.log('Had issues adding stay', err)
        }
    }

    if (!stays) return <div>Loading..</div>

    return (
        <>
            <LabelsFilter />
            <div className="stay-index">
                <StayList stays={stays} />
            </div>
            <Outlet context={{ title: 'hi', onAddStay }} />
        </>
    )
}