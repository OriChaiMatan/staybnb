import { useState } from "react"
import ConfirmationModal from "./ConfirmationModal"
import { utilService } from "../../services/util.service"



export function MobileReserve({ stay, selectedRange }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const totalNights = selectedRange.start && selectedRange.end ? calculateDaysBetween(selectedRange.start, selectedRange.end) : 0
  const totalPrice = stay.price * totalNights
  const startDate = selectedRange.start ? utilService.formatDate(selectedRange.start) : null
  const endDate = selectedRange.end ? utilService.formatDate(selectedRange.end) : null

  function closeConfirmationModal() {
    setShowConfirmationModal(false)
  }

  function onReserve() {
    if (!selectedRange.start || !selectedRange.end) {
      showErrorMsg('Please fill in dates')
    }
    else {
      setShowConfirmationModal(true)
    }
  }


  function calculateDaysBetween(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const diffInMilliseconds = endDate - startDate;

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInDays = diffInMilliseconds / millisecondsPerDay;

    return Math.ceil(diffInDays);
  }


  return (
    <div className="mobile-reserve">

      <div>
        <span>
          <b>${stay.price}</b> night
        </span>

        {selectedRange.start && selectedRange.end &&
          <>
            <span>{utilService.formatMonthDay(selectedRange.start)}</span>
            <span>{utilService.formatMonthDay(selectedRange.end)}</span>
          </>
        }
        <button className="btn-reserve" onClick={onReserve}>
          Reserve
        </button>

        {showConfirmationModal &&
          <ConfirmationModal
            onClose={closeConfirmationModal}
            startDate={startDate}
            endDate={endDate}
            stay={stay}
            totalNights={totalNights}
            totalPrice={totalPrice}
          />}
      </div>
    </div>


  )
}
