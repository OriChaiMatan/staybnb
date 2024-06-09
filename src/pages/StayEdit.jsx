import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { ImgUploader } from "../cmps/ImgUploader"
import { saveStay } from "../store/actions/stay.action"
import { showErrorMsg } from "../services/event-bus.service"

export function StayEdit() {
    const context = useOutletContext()
    const [stay, setStay] = useState(stayService.getEmptyStay())
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    function handleChange({ target }) {
        const { value, name, type, checked, selectedOptions } = target;
        const [fieldName, nestedField] = name.split('.');

        if (type === 'checkbox') {
            let updatedAmenities;
            if (checked) {
                updatedAmenities = [...stay.amenities, value];
            } else {
                updatedAmenities = stay.amenities.filter((amenity) => amenity !== value);
            }
            setStay((prevStay) => ({ ...prevStay, amenities: updatedAmenities }));
        } else if (type === 'select-multiple') {
            const values = Array.from(selectedOptions, option => option.value);
            setStay((prevStay) => ({ ...prevStay, [name]: values }));
        } else if (nestedField === 'imgUrls') {
            setStay((prevStay) => ({
                ...prevStay,
                [fieldName]: {
                    ...prevStay[fieldName],
                    ...value
                }
            }));
        } else if (nestedField) {
            setStay((prevStay) => ({
                ...prevStay,
                [fieldName]: {
                    ...prevStay[fieldName],
                    [nestedField]: value
                }
            }));
        } else {
            setStay((prevStay) => ({ ...prevStay, [fieldName]: value }));
        }
    }

    function validateFields() {
        const newErrors = {}
        if (!stay.name) newErrors.name = 'Name is required'
        if (!stay.loc.country) newErrors.country = 'Country is required'
        if (!stay.loc.city) newErrors.city = 'City is required'
        if (!stay.loc.address) newErrors.address = 'Address is required'
        if (!stay.capacity) newErrors.capacity = 'Capacity is required'
        if (!stay.type) newErrors.type = 'Type is required'
        if (!stay.price) newErrors.price = 'Price is required'
        if (!stay.beds) newErrors.beds = 'Beds are required'
        if (!stay.bedrooms) newErrors.bedrooms = 'Bedrooms are required'
        if (!stay.bath) newErrors.bath = 'Baths are required'
        if (!stay.labels.length) newErrors.labels = 'At least one label is required'
        if (!stay.amenities.length) newErrors.amenities = 'At least one amenity is required'
        if (!stay.summary) newErrors.summary = 'Description is required'
        return newErrors
    }

    async function onSaveStay(ev) {
        ev.preventDefault()
        const newErrors = validateFields()
        if (Object.keys(newErrors).length) {
            let missingInputsStr = 'Missing inputs: '
            for (const [field, message] of Object.entries(newErrors)) {
                missingInputsStr += `${field}, `
                showErrorMsg(missingInputsStr)
            }
            return
        }
        try {
            await saveStay(stay)
            navigate('/dashboard/listing')
        } catch (err) {
            console.log('Had issues sending stay', err)
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

    const stayLabels = [
        "Beach", "Beachfront", "Vineyards", "Mansions", "Lake", "Treehouses",
        "Farms", "Skiing", "Amazing pools", "Earth homes", "Amazing views",
        "Desert", "Lakefront", "Islands", "Tropical", "Camping", "Surfing",
        "Bed & breakfasts", "Luxe", "Top of the world", "Ski-in/out"
    ];

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
                        <option value="House" selected>House</option>
                        <option value="Guesthouse">Guesthouse</option>
                        <option value="Hotel">Hotel</option>
                    </select></span>
                    <span>Price: <input type="number" name="price" value={stay.price} onChange={handleChange} /></span>
                    <span>Beds: <input type="number" name="beds" value={stay.beds} onChange={handleChange} /></span>
                    <span>Bedrooms: <input type="number" name="bedrooms" value={stay.bedrooms} onChange={handleChange} /></span>
                    <span>Baths: <input type="number" name="bath" value={stay.bath} onChange={handleChange} /></span>
                    <span>Labels:
                        <select name="labels" value={stay.labels} onChange={handleChange} multiple>
                            {stayLabels.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </select>
                    </span>
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
