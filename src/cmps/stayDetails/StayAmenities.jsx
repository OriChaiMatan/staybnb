import WifiSvg from "../../svg/amenities/WifiSvg"
import KitchenSvg from "../../svg/amenities/KitchenSvg"
import WasherSvg from "../../svg/amenities/WasherSvg"
import DryerSvg from "../../svg/amenities/DryerSvg"
import AirConditioningSvg from "../../svg/amenities/AirConditioningSvg"
import HeatingSvg from "../../svg/amenities/HeatingSvg"
import TVSvg from "../../svg/amenities/TvSvg"
import IronSvg from "../../svg/amenities/IronSvg"
import PoolSvg from "../../svg/amenities/PoolSvg"
import PetsAllowedSvg from "../../svg/amenities/PetsAllowedSvg"
import FreeParkingSvg from "../../svg/amenities/FreeParkingSvg"
import GymSvg from "../../svg/amenities/GymSvg"
import SmokingAllowedSvg from "../../svg/amenities/SmokingAllowedSvg"
import BBQGrillSvg from "../../svg/amenities/BBQGrillSvg"


const amenityIcons = {
  Wifi: <WifiSvg />,
  Kitchen: <KitchenSvg />,
  Washer: <WasherSvg />,
  Dryer: <DryerSvg />,
  Air_conditioning: <AirConditioningSvg />,
  Heating: <HeatingSvg />,
  TV: <TVSvg />,
  Iron: <IronSvg />,
  Pool: <PoolSvg />,
  Pets_allowed: <PetsAllowedSvg />,
  Free_parking: <FreeParkingSvg />,
  Gym: <GymSvg />,
  Smoking_allowed: <SmokingAllowedSvg />,
  BBQ_Grill: <BBQGrillSvg />,
}

export function StayAmenities({ amenities }) {

  return (
    <section>
      <h2>What this place offers</h2>
      <div className="offers-grid">
        {amenities.map((amenity, index) => {
          const amenityKey = amenity.replace(/\s+/g, "_");
          return (
            <div key={index} className="offer">
              {amenityIcons[amenityKey]}
              {amenity}
            </div>
          )
        })}
      </div>
    </section>
  )
}

