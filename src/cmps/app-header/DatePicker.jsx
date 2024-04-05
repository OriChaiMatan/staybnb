import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useState, useEffect } from 'react';

export default function DatePicker({ onDatesChange }) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    onDatesChange(value);
  }, [value, onDatesChange]);

  // useEffect(() => {
  //   const divElement = document.querySelector('.MuiDateRangeCalendar-root > div:first-child');
  //   if (divElement) {
  //     divElement.remove();
  //   }
  // }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
        <DemoItem label="Controlled calendar">
          <DateRangeCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
