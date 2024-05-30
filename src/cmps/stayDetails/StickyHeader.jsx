

export function StickyHeader ({ onNavigate, showButton, stay }) {
  return (
    <div className="sticky-header">
      <nav>
        <ul>
          <li onClick={() => onNavigate("photos")}>Photos</li>
          <li onClick={() => onNavigate("amenities")}>Amenities</li>
          <li onClick={() => onNavigate("reviews")}>Reviews</li>
          <li onClick={() => onNavigate("location")}>Location</li>
        </ul>
        {showButton && (
          <div className="sticky-summary">
            <span>
              <b>${stay.price}</b> night
            </span>
            <button onClick={() => onNavigate("reviews")}>
              <span>Reserve</span>
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}