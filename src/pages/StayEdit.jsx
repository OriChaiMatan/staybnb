import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { stayService } from "../services/stay.service"

import { uploadService } from "../services/upload.service"
import { ImgUploader } from "../cmps/ImgUploader"

import Star from "../svg/StarSvg"

export function StayEdit(props) {
    const context = useOutletContext()
    const [stay, setStay] = useState(stayService.getEmptyStay())
    // console.log(stay)

    function handleChange({ target }) {
        const { value, name, type, checked } = target
        const [fieldName, nestedField] = name.split('.')

        if (type === 'checkbox') {
            let updatedAmenities
            if (checked) {
                updatedAmenities = [...stay.amenities, value]
            } else {
                updatedAmenities = stay.amenities.filter((amenity) => amenity !== value)
            }
            setStay((prevStay) => ({ ...prevStay, amenities: updatedAmenities }))
        } else if (nestedField === 'imgUrls') {
            setStay((prevStay) => ({
                ...prevStay,
                [fieldName]: {
                    ...prevStay[fieldName],
                    ...value
                }
            }))
        } else if (nestedField) {
            setStay((prevStay) => ({
                ...prevStay,
                [fieldName]: {
                    ...prevStay[fieldName],
                    [nestedField]: value
                }
            }));
        } else {
            setStay((prevStay) => ({ ...prevStay, [fieldName]: value }))
        }
    }



    async function onSaveStay(ev) {
        ev.preventDefault()
        try {
            // await context.onAddStay(stay)
            await stayService.save(stay)
        } catch (err) {
            console.log('Had issues sending stay', err);
        }
    }

    function handleImgUpload(imgData) {
        setStay(prevStay => ({
            ...prevStay,
            imgUrls: [...prevStay.imgUrls, imgData]
        }));
    }




    function getCountryCode(countryName) {    //function to find the country code
        const countries = countryJson.findAll()
        const country = countries.find(c => c.country === countryName)
        return country ? country.code : "Country not found"
    }

    return (
        <div className="stay-edit-container">
            <form className="stay-edit" onSubmit={onSaveStay}>
                <h1>Stay Edit</h1>
                <input type="text" name="name" placeholder="stay name" value={stay.name} onChange={handleChange} />
                <span><div className="star-icon"><Star /></div>New {stay.reviews.length} Reviews •</span>
                <div className="loc">
                    <span> Country: <input type="text" name="loc.country" value={stay.loc.country} onChange={handleChange} /></span>
                    <span> City: <input type="text" name="loc.city" value={stay.loc.city} onChange={handleChange} /></span>
                    <span> Address: <input type="text" name="loc.address" value={stay.loc.address} onChange={handleChange} /></span>
                </div>
                <ImgUploader onUploaded={handleImgUpload} />
                <ImgUploader onUploaded={handleImgUpload} />
                <ImgUploader onUploaded={handleImgUpload} />
                <ImgUploader onUploaded={handleImgUpload} />
                <ImgUploader onUploaded={handleImgUpload} />
                <div className="type">
                    <span>Capacity: <input type="number" name="capacity" value={stay.capacity} onChange={handleChange} /></span> •
                    <span>StayType: <select name="type" value={stay.type} onChange={handleChange}>
                        <option value="Entire Home/Apartment">Entire Home/Apartment</option>
                        <option value="Private Room">Private Room</option>
                        <option value="Shared Room">Shared Room</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Unique Stays">Unique Stays</option>
                        <option value="Camping">Camping</option>
                        <option value="RVs and Campervans">RVs and Campervans</option>
                    </select></span> •
                    <span>price: <input type="number" name="price" value={stay.price} onChange={handleChange} /> /night</span>
                </div>
                <div>
                    <span>Description</span>
                    <textarea name="summary" id="" cols="50" rows="15" value={stay.summary} onChange={handleChange}></textarea>
                </div>
                <div className="amenities">
                    <span>Amenities</span>
                    <span><input type="checkbox" name="amenities" value="Wifi" onChange={handleChange} /> Wifi</span>
                    <span><input type="checkbox" name="amenities" value="Kitchen" onChange={handleChange} /> Kitchen</span>
                    <span><input type="checkbox" name="amenities" value="Washer" onChange={handleChange} /> Washer</span>
                    <span><input type="checkbox" name="amenities" value="Dryer" onChange={handleChange} /> Dryer</span>
                    <span><input type="checkbox" name="amenities" value="Air conditioning" onChange={handleChange} /> Air conditioning</span>
                    <span><input type="checkbox" name="amenities" value="Heating" onChange={handleChange} /> Heating</span>
                    <span><input type="checkbox" name="amenities" value="TV" onChange={handleChange} /> TV</span>
                    <span><input type="checkbox" name="amenities" value="Iron" onChange={handleChange} /> Iron</span>
                    <span><input type="checkbox" name="amenities" value="Pool" onChange={handleChange} /> Pool</span>
                    <span><input type="checkbox" name="amenities" value="Pets allowed" onChange={handleChange} /> Pets allowed</span>
                    <span><input type="checkbox" name="amenities" value="Gym" onChange={handleChange} /> Gym</span>
                    <span><input type="checkbox" name="amenities" value="Smoking allowed" onChange={handleChange} /> Smoking allowed</span>
                    <span><input type="checkbox" name="amenities" value="BBQ Grill" onChange={handleChange} /> BBQ Grill</span>


                </div>
                <button>Save</button>
            </form>
        </div>
    )
}