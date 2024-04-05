import { useState, useEffect } from "react"
import { useParams } from "react-router";
import { stayService } from "../services/stay.service";
export function StayDetails() {
    const [stay, setStay] = useState(stayService.getEmptyStay())
    const params = useParams()
    useEffect(() => {
        loadStay()
        console.log('path',location.pathname.split('/')[2])
    }, [location.pathname])
    async function loadStay() {
        try {
            const stay = await stayService.getById(location.pathname.split('/')[2])
            setStay(stay)
        } catch (err) {
            console.log('Error in loadStay', err)
        }
    }
    console.log(stay)
    return (
        <section>
            <h1>{stay.name}</h1>
            {/* <span>{stay.type} in {stay.city}, {stay.country}</span> */}
        </section>
    )
}