/* eslint-disable react/no-unknown-property */

export function LabelsFilterItem({ imgSrc, altText, nameLabel, selected, onItemClick }) {


  return (
    <div className={`item-label ${selected ? "bold" : ""}`} datatype={nameLabel} onClick={onItemClick}>
      <img src={imgSrc} alt={altText} />
      <div className="name-label">{nameLabel}</div>
    </div>
  )
}