import beach from "../assets/img/label_icons_img/beach.png"
import beachfront from "../assets/img/label_icons_img/beachfront.png"
import vineyards from "../assets/img/label_icons_img/vineyards.png"
import mansions from "../assets/img/label_icons_img/mansions.png"
import lake from "../assets/img/label_icons_img/lake.png"
import treehouses from "../assets/img/label_icons_img/treehouses.png"
import farms from "../assets/img/label_icons_img/farms.png"
import skiing from "../assets/img/label_icons_img/skiing.png"
import amazing_pools from "../assets/img/label_icons_img/amazing_pools.png"
import earth_homes from "../assets/img/label_icons_img/earth_homes.png"
import amazing_views from "../assets/img/label_icons_img/amazing_views.png"
import desert from "../assets/img/label_icons_img/desert.png"
import lakefront from "../assets/img/label_icons_img/lakefront.png"
import islands from "../assets/img/label_icons_img/islands.png"
import tropical from "../assets/img/label_icons_img/tropical.png"
import camping from "../assets/img/label_icons_img/camping.png"
import surfing from "../assets/img/label_icons_img/surfing.png"
import bed_breakfasts from "../assets/img/label_icons_img/bed_breakfasts.png"
import luxe from "../assets/img/label_icons_img/luxe.png"
import top_of_the_world from "../assets/img/label_icons_img/top_of_the_world.png"
import ski_in_out from "../assets/img/label_icons_img/ski-in-out.png"
import { ArrowNext } from "../svg/ArrowNext"
import ArrowBack from "../svg/ArrowBack"
import FilterIcon from "../svg/FilterIcon"
import { Link } from "react-router-dom"

export function LabelsFilter() {

  const labels = [
    { imgSrc: beach, altText: "beach-img", nameLabel: "Beach" },
    { imgSrc: beachfront, altText: "beachfront-img", nameLabel: "Beachfront" },
    { imgSrc: vineyards, altText: "vineyards-img", nameLabel: "Vineyards" },
    { imgSrc: mansions, altText: "mansions-img", nameLabel: "Mansions" },
    { imgSrc: lake, altText: "lake-img", nameLabel: "Lake" },
    { imgSrc: treehouses, altText: "treehouses-img", nameLabel: "Treehouses" },
    { imgSrc: farms, altText: "farms-img", nameLabel: "Farms" },
    { imgSrc: skiing, altText: "skiing-img", nameLabel: "Skiing" },
    { imgSrc: amazing_pools, altText: "amazing-pools-img", nameLabel: "Amazing pools" },
    { imgSrc: earth_homes, altText: "earth-homes-img", nameLabel: "Earth homes" },
    { imgSrc: amazing_views, altText: "amazing-views-img", nameLabel: "Amazing views" },
    { imgSrc: desert, altText: "desert-img", nameLabel: "Desert" },
    { imgSrc: lakefront, altText: "lakefront-img", nameLabel: "Lakefront" },
    { imgSrc: islands, altText: "islands-img", nameLabel: "Islands" },
    { imgSrc: tropical, altText: "tropical-img", nameLabel: "Tropical" },
    { imgSrc: camping, altText: "camping-img", nameLabel: "Camping" },
    { imgSrc: surfing, altText: "surfing-img", nameLabel: "Surfing" },
    { imgSrc: bed_breakfasts, altText: "bed-breakfasts-img", nameLabel: "Bed & breakfasts" },
    { imgSrc: luxe, altText: "luxe-img", nameLabel: "Luxe" },
    { imgSrc: top_of_the_world, altText: "top-of-the-world-img", nameLabel: "Top of the world" },
    { imgSrc: ski_in_out, altText: "ski-in-out-img", nameLabel: "Ski-in/out" }
  ]


  return (
    <section className="labels-filter">
      <button className="back-categories-page">
        <ArrowBack />
      </button>
      {labels.map((item, index) => (
        <LabelsFilterItem key={index}
          {...item}
        />
      ))}
      <button className="next-categories-page">
        <ArrowNext />
      </button>

      <button className="filter-btn">
      <FilterIcon/>
        Filter
      </button>
    </section>
  )
}

export function LabelsFilterItem({ imgSrc, altText, nameLabel }) {
  const linkUrl = `/${nameLabel.toLowerCase()}`
  return (
    <Link to={linkUrl}>
      <div className="item-label">
        <img src={imgSrc} alt={altText} />
        <div className="name-label">{nameLabel}</div>
      </div>
    </Link>
  )
}