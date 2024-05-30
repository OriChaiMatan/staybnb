import { utilService } from "../../services/util.service"
import StarReview from "../../svg/StarReviewSvg"
import StarSvg from "../../svg/StarSvg"

export function StayInfo({ stay}) {
  const {type, loc, capacity, bedrooms, beds, bath, reviews} = stay
  return (

    <div className="stay-info-content">
      <h1 className="location">
        {type} in {loc.city}, {loc.country}
      </h1>
      <div className="stay-capacity">
        {capacity === 1 ? "1 guest" : `${capacity} guests`} •{" "}
        {bedrooms === 1 ? "1 bedroom" : `${bedrooms} bedrooms`} •{" "}
        {beds === 1 ? "1 bed" : `${beds} beds`} •{" "}
        {bath === 1 ? "1 bath" : `${bath} baths`}
      </div>

      <section className="ratnig-summary">
        <StarSvg />
        {reviews.length !== 0 && (
          <>
            {utilService.calculateAvgRating(reviews) !== "0.00" &&
              utilService.calculateAvgRating(reviews) !== "0.0" && (
                <>
                  <div className="average-rating">
                    {utilService.calculateAvgRating(reviews)}
                  </div>
                  <div>·</div>
                </>
              )}
            <a className="reviews-count" href="#">
              {reviews.length} reviews
            </a>
          </>
        )}
        {reviews.length === 0 && (
          <span className="no-reviews">No reviews yet</span>
        )}
      </section>
    </div>
  )
}
