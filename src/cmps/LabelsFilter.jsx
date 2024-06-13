
import { ArrowNext } from "../svg/ArrowNext"
import ArrowBack from "../svg/ArrowBack"
import FilterIcon from "../svg/FilterIcon"
import React, { useEffect, useRef, useState } from "react"
import { LabelsFilterItem } from "./LabelsFilterItem"
import { AdvancedFilter } from "./AdvancedFilter/AdvancedFilter"

export function LabelsFilter({ filterBy, onSetFilter }) {


  const labels = [
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063824/beach_ugn0q3.png", 
    altText: "beach-img", nameLabel: "Beach" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063844/beachfront_uz0otv.png",
     altText: "beachfront-img", nameLabel: "Beachfront" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064201/vineyards_hvypws.png",
     altText: "vineyards-img", nameLabel: "Vineyards" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064069/mansions_wjeeml.png",
     altText: "mansions-img", nameLabel: "Mansions" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063997/lake_adozli.png",
     altText: "lake-img", nameLabel: "Lake" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064168/treehouses_u9cnaf.png",
     altText: "treehouses-img", nameLabel: "Treehouses" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063953/farms_kwoc0s.png",
     altText: "farms-img", nameLabel: "Farms" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064091/skiing_ccby2m.png",
     altText: "skiing-img", nameLabel: "Skiing" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063507/amazing_pools_dpylvq.png",
     altText: "amazing-pools-img", nameLabel: "Amazing pools" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063931/earth_homes_ln2zty.png",
     altText: "earth-homes-img", nameLabel: "Earth homes" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063768/amazing_views_vhyqc9.png",
     altText: "amazing-views-img", nameLabel: "Amazing views" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063911/desert_asovai.png",
     altText: "desert-img", nameLabel: "Desert" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064015/lakefront_ze7yei.png",
     altText: "lakefront-img", nameLabel: "Lakefront" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063979/islands_qcbnis.png",
     altText: "islands-img", nameLabel: "Islands" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064186/tropical_x6amqu.png",
     altText: "tropical-img", nameLabel: "Tropical" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063890/camping_jeueuk.png",
     altText: "camping-img", nameLabel: "Camping" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064130/surfing_wrxzh4.png",
     altText: "surfing-img", nameLabel: "Surfing" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717063869/bed_breakfasts_emhbwj.png",
     altText: "bed-breakfasts-img", nameLabel: "Bed & breakfasts" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064051/luxe_mhbmqv.png",
     altText: "luxe-img", nameLabel: "Luxe" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064149/top_of_the_world_rmvs0n.png",
     altText: "top-of-the-world-img", nameLabel: "Top of the world" },
    { imgSrc: "http://res.cloudinary.com/dqti9icif/image/upload/v1717064109/ski-in-out_ggsokt.png",
     altText: "ski-in-out-img", nameLabel: "Ski-in/out" }
  ]
  const ITEM_WIDTH = labels.length * 100 / 7
  const [focusedItem, setFocusedItem] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showBackButton, setShowBackButton] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const containerRef = useRef()

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleItemClick(ev, index) {
    const value = ev.target.closest('.item-label').getAttribute('datatype');
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, category_tag: value }))
    setFocusedItem(index)
    onSetFilter(filterByToEdit)
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

  function handleOpenAdvancedFilter() {
    setShowFilterModal(true);
  }

  function handleCloseAdvancedFilter() {
    setShowFilterModal(false);
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
            onItemClick={(ev) => handleItemClick(ev, index)}
          />
        ))}

      </div>
      <button className={`next-categories-page ${reachedEnd ? 'hidden' : 'visible'}`} onClick={() => { handleScroll(ITEM_WIDTH) }}>
        <ArrowNext />
      </button>

      <button className="filter-btn" onClick={handleOpenAdvancedFilter}>
        <FilterIcon />
        Filter
      </button>

      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <AdvancedFilter handleCloseAdvancedFilter={handleCloseAdvancedFilter} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />
          </div>
        </div>
      )}
    </section>
  )
}
