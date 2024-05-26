import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { uploadService } from "../services/upload.service"
import { ImgUploader } from "../cmps/ImgUploader"
import { saveStay } from "../store/actions/stay.action"
import Star from "../svg/StarSvg"

export function StayEdit(props) {
    const context = useOutletContext()
    const [stay, setStay] = useState(stayService.getEmptyStay())

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
            await saveStay(stay)
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

    function getCountryCode(countryName) {    
        const countries = countryJson.findAll()
        const country = countries.find(c => c.country === countryName)
        return country ? country.code : "Country not found"
    }

    return (
        <div className="stay-edit-container">
            <form className="stay-edit" onSubmit={onSaveStay}>
                <section className="stay-title">
                    <input className="new-stay-name" type="text" name="name" placeholder="Stay name" value={stay.name} onChange={handleChange} />
                </section>
                <section className="loc">
                    <input type="text" name="loc.country" placeholder="Country" value={stay.loc.country} onChange={handleChange} />
                    <input type="text" name="loc.city" placeholder="City" value={stay.loc.city} onChange={handleChange} />
                    <input type="text" name="loc.address" placeholder="Address" value={stay.loc.address} onChange={handleChange} />
                </section>
                <section className="stay-img-upload">
                    <div className="add-big-img"><ImgUploader onUploaded={handleImgUpload} /></div>
                    <div className="add-img"><ImgUploader onUploaded={handleImgUpload} /></div>
                    <div className="add-top-right-img"><ImgUploader onUploaded={handleImgUpload} /></div>
                    <div className="add-img"><ImgUploader onUploaded={handleImgUpload} /></div>
                    <div className="add-bottom-right-img"><ImgUploader onUploaded={handleImgUpload} /></div>
                </section>
                <div className="type">
                    <span>Capacity: <input type="number" name="capacity" value={stay.capacity} onChange={handleChange} /></span>
                    <span>Stay type: <select name="type" value={stay.type} onChange={handleChange}>
                        <option value="Entire Home/Apartment">Entire Home/Apartment</option>
                        <option value="Private Room">Private Room</option>
                        <option value="Shared Room">Shared Room</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Unique Stays">Unique Stays</option>
                        <option value="Camping">Camping</option>
                        <option value="RVs and Campervans">RVs and Campervans</option>
                    </select></span>
                    <span>Price: <input type="number" name="price" value={stay.price} onChange={handleChange} /></span>
                    <span>Beds: <input type="number" name="beds" value={stay.beds} onChange={handleChange} /></span>
                    <span>Bedrooms: <input type="number" name="bedrooms" value={stay.bedrooms} onChange={handleChange} /></span>
                    <span>Baths: <input type="number" name="bath" value={stay.bath} onChange={handleChange} /></span>
                </div>
                <section className="description">
                    <span>Description</span>
                    <textarea name="summary" cols="50" rows="15" value={stay.summary} onChange={handleChange}></textarea>
                </section>
                <div className="amenities">
                    <h1>Amenities</h1>
                    <section className="amenities-list">
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
                    </section>
                </div>
                <button className="save-btn">Save</button>
            </form>
        </div>
    )
}