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
import React, { useRef, useState } from "react"
import { LabelsFilterItem } from "./LabelsFilterItem"



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
  const ITEM_WIDTH = labels.length * 100 / 2
  const [focusedItem, setFocusedItem] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showBackButton, setShowBackButton] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)

  const containerRef = useRef()

  function handleItemClick(index) {
    setFocusedItem(index)
  }

  function handleScroll(scrollAmount) {
    const newScrollPosition = scrollPosition + scrollAmount
    setScrollPosition(newScrollPosition)

    containerRef.current.scrollLeft = newScrollPosition

    //for displaying the buttons
    setShowBackButton(newScrollPosition > 0)
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
    setReachedEnd(newScrollPosition >= maxScroll)
  }


  return (
    <section className="labels-filter">
      <button className={`back-categories-page ${showBackButton ? 'visible' : 'hidden'}`} onClick={() => { handleScroll(-ITEM_WIDTH) }}>
        <ArrowBack />
      </button>
      <div className="container-ref" ref={containerRef}>
        {labels.map((item, index) => (
          <LabelsFilterItem
            key={index}
            {...item}
            selected={index === focusedItem}
            onItemClick={() => handleItemClick(index)}
          />
        ))}

      </div>
      <button className={`next-categories-page ${reachedEnd ? 'hidden' : 'visible'}`} onClick={() => { handleScroll(ITEM_WIDTH) }}>
        <ArrowNext />
      </button>

      <button className="filter-btn">
        <FilterIcon />
        Filter
      </button>
    </section>
  )
}
