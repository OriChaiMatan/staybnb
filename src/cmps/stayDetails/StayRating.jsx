import { utilService } from "../../services/util.service"
import CleanlinessSvg from "../../svg/rating/CleanlinessSvg"
import AccuracySvg from "../../svg/rating/AccuracySvg"
import CheckinSvg from "../../svg/rating/CheckinSvg"
import CommunicationSvg from "../../svg/rating/CommunicationSvg"
import LocationSvg from "../../svg/rating/LocationSvg"
import ValueSvg from "../../svg/rating/ValueSvg"
import StarSvg from "../../svg/StarSvg"

export function StayRating({ reviews }) {

  const ratingCategories = [
    { label: 'Cleanliness', value: 4.9, Icon: CleanlinessSvg },
    { label: 'Accuracy', value: 4.8, Icon: AccuracySvg },
    { label: 'Check-in', value: 4.9, Icon: CheckinSvg },
    { label: 'Communication', value: 5.0, Icon: CommunicationSvg },
    { label: 'Location', value: 5.0, Icon: LocationSvg },
    { label: 'Value', value: 4.8, Icon: ValueSvg },
  ]

  return (
    <div className="rating-reviews">
      <div className="reviews-rate">
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
            {reviews.length} reviews
          </>
        )}
        {reviews.length === 0 && (
          <span className="no-reviews">No reviews yet</span>
        )}
      </div>

      <section className="rating">

        <div className="overall-rating">
          <span>Overall rating</span>
          <div className="progress">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div className="rating-progress" key={rating}>
                {rating}
                <progress max="5" value={rating === 5 ? 4.6 : rating === 4 ? 4.1 : 0}></progress>
              </div>
            ))}
          </div>
        </div>

        <div className="rating-detail">
          {ratingCategories.map(({ label, value, Icon }) => (
            <div className="rating-item" key={label}>
              <div className="rating-info">
                <span>{label}</span>
                <div>{value}</div>
              </div>
              <Icon />
            </div>
          ))}
        </div>
      </section>
    </div>
  )

}