import { useState } from "react"
import { MdOutlineNavigateNext } from "react-icons/md"
import { AboutThisPlaceModel } from "./AboutThisPlaceModel"

export function StaySummary({ summary }) {
  
  const [showModal, setShowModal] = useState(false)

  function toggleModal(){
    setShowModal(!showModal)
  }

  function closeModal(){
    setShowModal(false)
  }
 

  return (
    <article className="summery">
      <div className="text-summery">{summary}</div>
      <div className="show-more" onClick={toggleModal}>
        Show more <MdOutlineNavigateNext />
      </div>
      {showModal && <AboutThisPlaceModel summary={summary} onClose={closeModal} />}
    </article>
  )
}


