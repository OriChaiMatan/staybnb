import { Link } from "react-router-dom"

export function LabelsFilterItem({ imgSrc, altText, nameLabel, selected, onItemClick }) {

  const linkUrl = `/${nameLabel.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`

  return (
    <Link to={linkUrl}>
      <div className={`item-label ${selected ? "bold" : ""}`} onClick={onItemClick}>
        <img src={imgSrc} alt={altText} />
        <div className="name-label">{nameLabel}</div>
      </div>
    </Link>
  )
}