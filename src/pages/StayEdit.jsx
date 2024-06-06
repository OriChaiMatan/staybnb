import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { ImgUploader } from "../cmps/ImgUploader"
import { saveStay } from "../store/actions/stay.action"

export function StayEdit() {
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

    function handleImgUpload(id, imgUrl) {
        setStay(prevStay => ({
            ...prevStay,
            imgUrls: {
                ...prevStay.imgUrls,
                [id]: imgUrl
            }
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
                    <div className="add-big-img"><ImgUploader id="big" onUploaded={handleImgUpload} /></div>
                    <div className="add-img"><ImgUploader id="small1" onUploaded={handleImgUpload} /></div>
                    <div className="add-top-right-img"><ImgUploader id="top-right" onUploaded={handleImgUpload} /></div>
                    <div className="add-img"><ImgUploader id="small2" onUploaded={handleImgUpload} /></div>
                    <div className="add-bottom-right-img"><ImgUploader id="bottom-right" onUploaded={handleImgUpload} /></div>
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
                        {["Wifi", "Kitchen", "Washer", "Dryer", "Air conditioning", "Heating", "TV", "Iron", "Pool", "Pets allowed", "Gym", "Smoking allowed", "BBQ Grill"].map((amenity) => (
                            <label key={amenity}>
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    value={amenity}
                                    checked={stay.amenities.includes(amenity)}
                                    onChange={handleChange}
                                />
                                {amenity}
                            </label>
                        ))}
                    </section>
                </div>
                <button className="save-btn"><i className="fancy-stay">Create your STAY</i></button>
            </form>
        </div>
    )
}
