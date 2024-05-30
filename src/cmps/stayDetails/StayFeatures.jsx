import CancelSvg from "../../svg/CancelSvg"
import SelfCheackIn from "../../svg/SelfCheckIn"
import WorkspaceSvg from "../../svg/WorkspaceSvg"


export function StayFeatures() {
  return (
    <section className="stay-features">
      <div className="line">
        <SelfCheackIn />
        <div className="text">
          <h4>Self check-in</h4>
          <p>Check yourself in with the lockbox.</p>
        </div>
      </div>
      <div className="line">
        <WorkspaceSvg />
        <div className="text">
          <h4>Dedicated workspace</h4>
          <p>
            Dedicated workspace A room with wifi that’s well-suited for
            working.
          </p>
        </div>
      </div>
      <div className="line">
        <CancelSvg />
        <div className="text">
          <h4>Free cancellation for 48 hours</h4>
        </div>
      </div>
    </section>
  )
}