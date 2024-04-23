import { useState, useEffect } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { StayList } from "../cmps/StayList"
import { LabelsFilter } from "../cmps/LabelsFilter"




export function StayIndex() {
    const [stays, setStays] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(stayService.getFilterFromParams(searchParams))

    useEffect(() => {
        const sanitizedFilterBy = Object.fromEntries(
            Object.entries(filterBy)
                .filter(([key, value]) => value !== undefined && value !== '')
        );

        setSearchParams(sanitizedFilterBy);
        loadStays();
        console.log('filterBy', filterBy);
    }, [filterBy]);

    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }

    async function loadStays() {
        try {
            const stays = await stayService.query(filterBy)
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
            <LabelsFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <div className="stay-index">
                <StayList stays={stays} />
            </div>
            <Outlet context={{ title: 'hi', onAddStay }} />
        </>
    )
}