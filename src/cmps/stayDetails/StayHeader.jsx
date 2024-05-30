import HeartSvg from "../../svg/HeartSvg"
import ShareSvg from "../../svg/ShareSvg"

export function StayHeader({ name }) {
  return (
    <header className="stay-info-header">
      <h1 className="title">{name}</h1>
      <div className="action-button">
        <div className="share">
          <ShareSvg />
          <div>Share</div>
        </div>
        <div className="heart">
          <HeartSvg />
          <div>Save</div>
        </div>
      </div>
    </header>
  )
}