// import * as React from 'react'
// import { useState, useEffect } from 'react'
// import dayjs from 'dayjs'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar'

// export function DatePicker({ onDatesChange }) {
//   const [value, setValue] = useState([null, null]);
//   const today = dayjs()

//   useEffect(() => {
//     if (onDatesChange) {
//       onDatesChange(value)
//     }
//   }, [value, onDatesChange])

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateRangeCalendar
//         value={value}
//         onChange={(newValue) => setValue(newValue)}
//         calendars={2}
//         minDate={today} // Set the minimum date to today
//       />
//     </LocalizationProvider>
//   )
// }
