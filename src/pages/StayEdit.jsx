import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { stayService } from "../services/stay.service"

import { ImgUploader } from "../cmps/ImgUploader"

import Star from "../svg/StarSvg"

export function StayEdit() {
    const context = useOutletContext()

    const [stay, setStay] = useState(stayService.getEmptyStay())
    console.log(stay)

    function handleChange({ target }) {
        const { value, name } = target

        console.log('name:', name, 'value:', value);
        setStay(prevStay => ({ ...prevStay, [name]: value }))
    }

    async function onSaveStay(ev) {
        ev.preventDefault();
        try {
            await stayService.save(stay)
        } catch (err) {
            console.log('Had issues sending stay', err);
        }
    }

    return (
        <form onSubmit={onSaveStay}>
            <h1>Stay Edit</h1>
            <input type="text" name="name" placeholder="stay name" value={stay.name} onChange={handleChange} />
            <span><div className="star-icon"><Star /></div>New {stay.reviews.length} Reviews • Address: <input type="text" name="loc.address" value={stay.loc.address} onChange={handleChange} /></span>
            <ImgUploader />
            <div>
                <span>Capacity: <input type="number" name="capacity" value={stay.capacity} onChange={handleChange} /></span> •
                <span>StayType: <select name="type" value={stay.type} onChange={handleChange}>
                    <option value="Entire Home/Apartment">Entire Home/Apartment</option>
                    <option value="Private Room">Private Room</option>
                    <option value="Shared Room">Shared Room</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Unique Stays">Unique Stays</option>
                    <option value="Camping">Camping</option>
                    <option value="RVs and Campervans">RVs and Campervans</option>
                </select></span>
                <span>price: <input type="number" name="price" value={stay.price} onChange={handleChange} /> /night</span>
            </div>
            <div>
                <span>Description</span>
                <textarea name="summary" id="" cols="50" rows="15" value={stay.summary} onChange={handleChange}></textarea>
            </div>
            <div>
                <span>Amenities</span>
                <span><input type="checkbox" /> TV</span>
                <span><input type="checkbox" /> Wifi</span>
                <span><input type="checkbox" /> AC</span>
                <span><input type="checkbox" /> Smoking allowed</span>
                <span><input type="checkbox" /> Pets allowed</span>
                <span><input type="checkbox" /> Cooking basics</span>
            </div>
            <button>Save</button>
        </form>
    )
}