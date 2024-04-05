import { useState, useEffect } from "react"
import { useParams } from "react-router";
import { stayService } from "../services/stay.service";

export function StayDetails(){
    const [stay, setStay] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadStay()
    }, [params.id])

    async function loadStay() {
        try {
            const stay = await stayService.getById(params.id)
            setStay(stay)
        } catch (err) {
            console.log('Error in loadStay', err)
        }
    }

    return (
        <h1>StayDetails</h1>
    )
}