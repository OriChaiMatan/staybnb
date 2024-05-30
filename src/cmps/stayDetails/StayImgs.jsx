

export function StayImgs({ imgUrls }) {
  return (
    <div className="stay-info-imgs">
      {imgUrls.slice(0, 5).map((url, index) => (
        <img
          key={index}
          src={url.imgUrl}
          alt={`Image ${index + 1}`}
          className={`grid-item-${index}`}
        />
      ))}
    </div>
  )
}