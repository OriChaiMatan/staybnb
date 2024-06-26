import React, { useEffect, useRef, useState } from "react";
import homeLogo from "../../assets/img/home.png";
import guesthouseLogo from "../../assets/img/guesthouse.jpg";
import hotelLogo from "../../assets/img/hotel.jpg";
import { PriceRange } from "./PriceRange";
import { Formik, Form } from "formik";
import { stayService } from "../../services/stay.service";
export function AdvancedFilter({
  handleCloseAdvancedFilter,
  filterByToEdit,
  setFilterByToEdit,
}) {
  const [advancedFilterByToEdit, setAdvancedFilterByToEdit] =
    useState(filterByToEdit);

  const initialMinPrice = stayService.minPricesStays();
  const initialMaxPrice = stayService.maxPricesStays();
  const [priceBounds, setPriceBounds] = useState({
    min: initialMinPrice,
    max: initialMaxPrice,
  });

  const [initialValues, setInitialValues] = useState({
    ...stayService.getDefaultFilter(),
  });
  const [selectedType, setSelectedType] = useState("Any");
  const [selectedBedroom, setSelectedBedroom] = useState("Any");
  const [selectedBed, setSelectedBed] = useState("Any");
  const [selectedBathroom, setSelectedBathroom] = useState("Any");
  const [selectedHouseProperty, setSelectedHouseProperty] = useState(null);
  const [selectedGuesthouseProperty, setSelectedGuesthouseProperty] =
    useState(null);
  const [selectedHotelProperty, setSelectedHotelProperty] = useState(null);
  const [selectedTopTier, setSelectedTopTier] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState({
    wifi: true,
    kitchen: false,
    washer: false,
    dryer: false,
    airconditioning: false,
    heating: false,
    tv: false,
    iron: false,
    pool: false,
    pets: false,
    parking: false,
    gym: false,
    smoking: false,
    bbq: false,
  });
  const filterModalRef = useRef(null);

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        handleCloseAdvancedFilter();
      }
    };

    const handleClickOutside = (event) => {
      if (
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target)
      ) {
        handleCloseAdvancedFilter();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChipClick = (e, value, type) => {
    e.preventDefault();
    switch (type) {
      case "bedroom":
        setSelectedBedroom(value);
        break;
      case "bed":
        setSelectedBed(value);
        break;
      case "bathroom":
        setSelectedBathroom(value);
        break;
      default:
        break;
    }
  };

  const handleTypeClick = (type, e) => {
    e.preventDefault();
    setSelectedType(type);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedAmenities({ ...selectedAmenities, [id]: checked });
  };

  function clearAllFilters() {
    setSelectedType("Any");
    setSelectedBedroom("Any");
    setSelectedBed("Any");
    setSelectedBathroom("Any");
    setSelectedTopTier(null);
    setSelectedHouseProperty(null);
    setSelectedGuesthouseProperty(null);
    setSelectedHotelProperty(null);
    setSelectedAmenities({
      wifi: false,
      kitchen: false,
      washer: false,
      dryer: false,
    });
    setFilterByToEdit(stayService.getDefaultFilter());
    handleCloseAdvancedFilter();
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();

    const selectedAmenitiesArray = Object.entries(selectedAmenities)
      .filter(([amenity, isChecked]) => isChecked)
      .map(([amenity]) => formatLabelText(amenity));

    const selectedPropertyTypes = [];
    if (selectedHouseProperty) {
      selectedPropertyTypes.push("House");
    }
    if (selectedGuesthouseProperty) {
      selectedPropertyTypes.push("Guesthouse");
    }
    if (selectedHotelProperty) {
      selectedPropertyTypes.push("Hotel");
    }
    setAdvancedFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      price_min: priceBounds.min,
      price_max: priceBounds.max,
      amenities: selectedAmenitiesArray,
      bedrooms: selectedBedroom === "Any" ? undefined : selectedBedroom,
      beds: selectedBed === "Any" ? undefined : selectedBed,
      bathrooms: selectedBathroom === "Any" ? undefined : selectedBathroom,
      property_types: selectedPropertyTypes,
    }));
    setFilterByToEdit(advancedFilterByToEdit);
  }

  const formatLabelText = (amenity) => {
    switch (amenity) {
      case "airconditioning":
        return "Air conditioning";
      case "bbq":
        return "BBQ Grill";
      case "tv":
        return "TV";
      case "pets":
        return "Pets allowed";
      case "parking":
        return "Free parking";
      case "smoking":
        return "Smoking allowed";
      default:
        return amenity.charAt(0).toUpperCase() + amenity.slice(1);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitFilter}>
      <div ref={filterModalRef} className="modal-container-inner">
        <header className="filter-form-header">
          <div className="close-login-container">
            <button onClick={handleCloseAdvancedFilter}>X</button>
          </div>
          <div>
            <h1>Filters</h1>
          </div>
          <div></div>
        </header>
        <div className="filter-modal-content">
          <form className="advanced-filter-form">
            <section>
              <div className="advanced-filter-content">
                <div className="advanced-filter-head">
                  <h2 className="advanced-filter-title">Type of place</h2>
                  <p className="advanced-filter-subtitle">
                    Search rooms, entire homes, or any type of place
                  </p>
                </div>
                <div className="advanced-filter-type">
                  <button
                    className={`option ${selectedType === "Any" ? "active" : ""
                      }`}
                    onClick={(e) => handleTypeClick("Any", e)}
                  >
                    Any type
                  </button>
                  <button
                    className={`option ${selectedType === "room" ? "active" : ""
                      }`}
                    onClick={(e) => handleTypeClick("room", e)}
                  >
                    Room
                  </button>
                  <button
                    className={`option ${selectedType === "home" ? "active" : ""
                      }`}
                    onClick={(e) => handleTypeClick("home", e)}
                  >
                    Entire home
                  </button>
                </div>
              </div>
            </section>
            <section>
              <div className="advanced-filter-content">
                <div className="advanced-filter-head">
                  <h2 className="advanced-filter-title">Price range</h2>
                  <p className="advanced-filter-subtitle">
                    Nightly prices including fees and taxes
                  </p>
                  <PriceRange
                    priceBounds={priceBounds}
                    setPriceBounds={setPriceBounds}
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="advanced-filter-content">
                <div className="advanced-filter-head">
                  <h2 className="advanced-filter-title advance-filter__no-subtitle">
                    Rooms and beds
                  </h2>
                  <div className="advanced-filter__chip-list">
                    <h3 className="chip-list-title">Bedrooms</h3>
                    <div className="chip-list">
                      {["Any", 1, 2, 3, 4, 5, 6, 7, "8+"].map((value) => (
                        <div className="chip-wrapper" key={value}>
                          <button
                            className={`chip ${selectedBedroom === value ? "selected" : ""
                              }`}
                            onClick={(e) =>
                              handleChipClick(e, value, "bedroom")
                            }
                          >
                            {value}
                          </button>
                        </div>
                      ))}
                    </div>
                    <h3 className="chip-list-title">Beds</h3>
                    <div className="chip-list">
                      {["Any", 1, 2, 3, 4, 5, 6, 7, "8+"].map((value) => (
                        <div className="chip-wrapper" key={value}>
                          <button
                            className={`chip ${selectedBed === value ? "selected" : ""
                              }`}
                            onClick={(e) => handleChipClick(e, value, "bed")}
                          >
                            {value}
                          </button>
                        </div>
                      ))}
                    </div>
                    <h3 className="chip-list-title">Bathrooms</h3>
                    <div className="chip-list">
                      {["Any", 1, 2, 3, 4, 5, 6, 7, "8+"].map((value) => (
                        <div className="chip-wrapper" key={value}>
                          <button
                            className={`chip ${selectedBathroom === value ? "selected" : ""
                              }`}
                            onClick={(e) =>
                              handleChipClick(e, value, "bathroom")
                            }
                          >
                            {value}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="advanced-filter-content">
                <div className="advanced-filter-head">
                  <h2 className="advanced-filter-title advance-filter__no-subtitle">
                    Top-tier stays
                  </h2>
                </div>
                <div className="advanced-filter__top-tier">
                  <div
                    className={`card-select ${selectedTopTier && "card-select--selected"
                      }`}
                    onClick={() => setSelectedTopTier(!selectedTopTier)}
                  >
                    <span className="card-select__icon-wrapper">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{ height: "40px", width: "40px" }}
                      >
                        <path d="m26.3732689 2.47961624.6167441.48322004c1.7072543 1.33763663 2.6054782 2.90952832 2.6054782 4.67605261 0 .3660905-.0390268.72618704-.116891 1.07902433.2220822-.04940579.4535208-.09078168.6921664-.12465571l.775726-.11010878.2925061.72685288c.8097073 2.01205449.8016461 3.82246449-.0816161 5.35231939-.2032148.3519785-.4424546.6712615-.7165374.9579743l.2224321.0794128.9515555.3797252-.1101088.7757261c-.3048001 2.1473439-1.2169863 3.7111744-2.7468413 4.5944365-.5761025.332613-1.1919899.5411159-1.8434482.6285758.1841168.1929555.3637753.4031581.5393959.6273064l.48322.6167441-.48322.6167441c-1.3376366 1.7072543-2.9095283 2.6054781-4.6760526 2.6054781-1.2480882 0-2.4019214-.4496183-3.4432232-1.3171892l-.0012213.0394115c0 1.2886644 1.044669 2.3333333 2.3333334 2.3333333.5522847 0 1 .4477153 1 1s-.4477153 1-1 1c-2.3932339 0-4.3333334-1.9400994-4.3333334-4.3333333 0-.9731196.3231417-1.8972354.901435-2.6461065.0487133-.1124489.1099252-.2143841.183909-.2995515.2333023-.2685692.4731075-.5134836.719657-.7345023 1.092313-.9792012 2.3169607-1.4865064 3.6394435-1.4865064l.0684312.0004504c.3275052-1.8187509 1.1205491-3.1889128 2.3863714-4.0426116-.4569936-1.4757574-.4468151-2.8322754.0552629-4.0354282-1.4028349-1.2488618-2.1367966-2.68667211-2.1367966-4.28352171 0-1.76652429.8982238-3.33841598 2.6054781-4.67605261zm-3.5954911 19.52038376c-.8090047 0-1.5656514.3134377-2.3044395.9757225l-.1826884.1713488-.0733166.074262.1281937.1295236c.7776797.743284 1.5802193 1.0935875 2.4322508 1.0935875l.218427-.0078032c.7972463-.0573203 1.5547873-.4315014 2.2882491-1.1577185l.0555461-.056256-.0555461-.057145c-.8001401-.7922368-1.6289366-1.1655217-2.5066761-1.1655217zm3.7578827-4.4994059-.1852617.1159713c-.6617754.448264-1.1307346 1.1510849-1.4028227 2.1467382l-.0182612.0759557.0749618.0222525c1.0890601.2860271 1.9934613.1949031 2.753606-.2439667l.1852618-.1159712c.6617753-.4482641 1.1307346-1.1510849 1.4028226-2.1467383l.0193478-.0769097-.0760483-.0212985c-1.0890601-.2860271-1.9934613-.194903-2.7536061.2439667zm3.1123395-6.7679274-.0769097.0193477c-1.0861673.2968233-1.8238397.8279397-2.2627095 1.5880844l-.1024557.1930649c-.3489823.7190957-.4037025 1.5622361-.141511 2.5605412l.0222526.0749618.0759556-.0182613c1.0861673-.2968233 1.8238397-.8279397 2.2627095-1.5880844s.5299938-1.664546.2439667-2.7536061zm-3.2751755-5.65600003-.0562561.05554607c-.7922368.80014014-1.1655217 1.62893662-1.1655217 2.50667615l.0078032.21842698c.0573204.7972463.4315015 1.55478738 1.1577185 2.28824913l.0575894.0537683.0189905-.0176348c.505107-.50232394.8443631-1.01414101 1.0296433-1.53660354.1153772-.32534636.1726996-.65911739.1726996-1.00620607 0-.87773953-.3732849-1.70653601-1.1655217-2.50667615zm-20.9125938-2.59705043-.6167441.48322004c-1.70725429 1.33763663-2.60547812 2.90952832-2.60547812 4.67605261 0 .3660905.03902677.72618704.11689093 1.07902433-.22208221-.04940579-.45352077-.09078168-.69216632-.12465571l-.77572608-.11010878-.29250604.72685288c-.80970728 2.01205449-.80164608 3.82246449.08161606 5.35231939.20321486.3519785.44245466.6712615.71653743.9579743l-.2224321.0794128-.95155553.3797252.11010879.7757261c.30480015 2.1473439 1.21698637 3.7111744 2.74684128 4.5944365.57610257.332613 1.19198995.5411159 1.84344825.6285758-.18411676.1929555-.36377531.4031581-.53939589.6273064l-.48322004.6167441.48322004.6167441c1.33763662 1.7072543 2.90952832 2.6054781 4.67605261 2.6054781 1.24808813 0 2.40192143-.4496183 3.44322313-1.3171892l.0012213.0394115c0 1.2886644-1.0446689 2.3333333-2.3333333 2.3333333-.55228477 0-1.00000002.4477153-1.00000002 1s.44771525 1 1.00000002 1c2.3932339 0 4.3333333-1.9400994 4.3333333-4.3333333 0-.9731196-.3231417-1.8972354-.901435-2.6461065-.0487133-.1124489-.1099252-.2143841-.1839089-.2995515-.2333024-.2685692-.4731075-.5134836-.7196571-.7345023-1.092313-.9792012-2.3169606-1.4865064-3.63944343-1.4865064l-.06843124.0004504c-.32750516-1.8187509-1.12054908-3.1889128-2.38637136-4.0426116.45699357-1.4757574.44681506-2.8322754-.05526292-4.0354282 1.40283491-1.2488618 2.13679658-2.68667211 2.13679658-4.28352171 0-1.76652429-.89822383-3.33841598-2.60547813-4.67605261zm3.59549117 19.52038376c.8090047 0 1.56565133.3134377 2.30443953.9757225l.1826884.1713488.0733165.074262-.1281937.1295236c-.7776796.743284-1.58021923 1.0935875-2.43225073 1.0935875l-.21842698-.0078032c-.7972463-.0573203-1.55478738-.4315014-2.28824918-1.1577185l-.05554607-.056256.05554607-.057145c.80014014-.7922368 1.62893662-1.1655217 2.50667616-1.1655217zm-3.75788275-4.4994059.18526172.1159713c.66177537.448264 1.13073465 1.1510849 1.40282266 2.1467382l.01826127.0759557-.07496179.0222525c-1.08906009.2860271-1.99346135.1949031-2.75360608-.2439667l-.18526171-.1159712c-.66177538-.4482641-1.13073465-1.1510849-1.40282267-2.1467383l-.01934775-.0769097.07604828-.0212985c1.08906008-.2860271 1.99346134-.194903 2.75360607.2439667zm-3.11233948-6.7679274.07690971.0193477c1.08616726.2968233 1.82383971.8279397 2.26270948 1.5880844l.10245572.1930649c.34898228.7190957.40370248 1.5622361.14151095 2.5605412l-.02225252.0749618-.07595567-.0182613c-1.08616726-.2968233-1.8238397-.8279397-2.26270947-1.5880844s-.5299938-1.664546-.24396668-2.7536061zm3.27517551-5.65600003.05625608.05554607c.7922368.80014014 1.1655217 1.62893662 1.1655217 2.50667615l-.0078032.21842698c-.05732034.7972463-.43150144 1.55478738-1.1577185 2.28824913l-.05758942.0537683-.01899046-.0176348c-.50510698-.50232394-.84436314-1.01414101-1.02964333-1.53660354-.11537714-.32534636-.17269954-.65911739-.17269954-1.00620607 0-.87773953.3732849-1.70653601 1.1655217-2.50667615z"></path>
                      </svg>
                    </span>
                    <span className="card-select__title bold">
                      Guest favorites
                    </span>
                    <span className="card-select__info">
                      The most loved homes on Airbnb, according to guests
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="advanced-filter-content">
                <div className="advanced-filter-head">
                  <h2 className="advanced-filter-title advance-filter__no-subtitle">
                    Property type
                  </h2>
                </div>
                <div className="advanced-filter__property-type">
                  <div
                    className={`card-select ${selectedHouseProperty && "card-select--selected"
                      }`}
                    onClick={() =>
                      setSelectedHouseProperty(!selectedHouseProperty)
                    }
                  >
                    <span className="card-select__icon-wrapper">
                      <img
                        src={homeLogo}
                        style={{ width: "40px", height: "40px" }}
                        alt=""
                      />
                    </span>
                    <span className="card-select__title">House</span>
                  </div>
                  <div
                    className={`card-select ${selectedGuesthouseProperty && "card-select--selected"
                      }`}
                    onClick={() =>
                      setSelectedGuesthouseProperty(!selectedGuesthouseProperty)
                    }
                  >
                    <span className="card-select__icon-wrapper">
                      <img
                        src={guesthouseLogo}
                        style={{ width: "40px", height: "40px" }}
                        alt=""
                      />
                    </span>
                    <span className="card-select__title">Guesthouse</span>
                  </div>
                  <div
                    className={`card-select ${selectedHotelProperty && "card-select--selected"
                      }`}
                    onClick={() =>
                      setSelectedHotelProperty(!selectedHotelProperty)
                    }
                  >
                    <span className="card-select__icon-wrapper">
                      <img
                        src={hotelLogo}
                        style={{ width: "40px", height: "40px" }}
                        alt=""
                      />
                    </span>
                    <span className="card-select__title">Hotel</span>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="advanced-filter-content">
                <div className="advanced-filter-head">
                  <h2 className="advanced-filter-title advance-filter__no-subtitle">
                    Amenities
                  </h2>
                </div>
                <div className="checkbox-list">
                  <div>
                    <h3 className="checkbox-list-title">Essentials</h3>
                    <div className="checkbox-list-items">
                      {Object.entries(selectedAmenities).map(
                        ([amenity, isChecked]) => (
                          <label
                            htmlFor={amenity}
                            className="checkbox"
                            onChange={handleCheckboxChange}
                            key={amenity}
                          >
                            <span className="checkbox-label">
                              {formatLabelText(amenity)}
                            </span>
                            <span className="checkbox-container">
                              <input
                                type="checkbox"
                                id={amenity}
                                name={amenity}
                                className="checkbox-input"
                                checked={isChecked}
                              />
                              <span
                                className={`checkbox-custom ${isChecked ? "checked" : ""
                                  }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 32 32"
                                  aria-hidden="true"
                                  role="presentation"
                                  focusable="false"
                                  style={{
                                    display: "block",
                                    fill: "none",
                                    height: "16px",
                                    width: "16px",
                                    stroke: "currentcolor",
                                    strokeWidth: "4",
                                    overflow: "visible",
                                    color: "white",
                                  }}
                                >
                                  <path
                                    fill="none"
                                    d="m4 16.5 8 8 16-16"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
        <footer>
          <div className="advanced-filter-footer-content">
            <button
              className="advanced-filter-clear-button"
              type="button"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
            <button
              className="advanced-filter-submit-button"
              type="submit"
              onClick={onSubmitFilter}
            >
              Show places
            </button>
          </div>
        </footer>
      </div>
    </Formik>
  );
}
