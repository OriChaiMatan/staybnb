import StarReviewSvg from "../../svg/StarReviewSvg"

export function StayReviews({ reviews }) {

  function generateStars(rating) {
    return Array.from({ length: 5 }, (_, index) => (
      <StarReviewSvg key={index} filled={index < rating} />
    ))
  }


  return (
    <div className="guest-reviews-container">
      {reviews.map((review) => (
        <article className="review" key={review.id}>
          <div className="mini-user">
            <img
              className="review-img"
              src={review.by.imgUrl}
              alt={`img review by ${review.by.fullname}`}
            />
            <div className="mini-user-details">
              <h3>{review.by.fullname}</h3>
              {/* <span>{review.by.address}</span> */}
            </div>
          </div>

          <div className="review-info">
            <div className="star-review">{generateStars(review.rate)}</div>
            <div>·</div>
            <div className="date-review">{review.date}</div>
          </div>

          <div className="review-txt">{review.txt}</div>
        </article>
      ))}
    </div>
  )

}
