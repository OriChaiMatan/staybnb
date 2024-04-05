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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
        <DemoItem label="Controlled calendar">
          <div style={{ overflow: 'hidden' }}>
            <DateRangeCalendar
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
