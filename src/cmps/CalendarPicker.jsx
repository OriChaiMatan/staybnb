import React, { useState, useEffect } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfDay,
  startOfWeek,
  addDays,
  isSameDay,
  isBefore,
  isWithinInterval,
  endOfDay,
  isAfter,
} from "date-fns";

import RightArrowIcon from "../assets/img/arrow-right-black.svg";
import leftArrowIcon from "../assets/img/arrow-left-black.svg";

export function CalendarPicker({
  range,
  setRange,
  hoveredDate,
  setHoveredDate,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [range, setRange] = useState({ start: null, end: null });
  // const [hoveredDate, setHoveredDate] = useState(null);
  useEffect(() => {
    setRange(range);
  }, [range]);

  const nextMonthDate = addMonths(currentDate, 1);

  function onDateClick(day) {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
    } else {
      setRange((prev) => ({
        start: prev.start,
        end: day < prev.start ? prev.start : day,
      }));
    }
  }

  function onDateHover(day) {
    if (range.start && !range.end && isAfter(day, range.start)) {
      setHoveredDate(day);
    } else {
      setHoveredDate(null);
    }
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getStartDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function getMonthName(monthNum) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthNum >= 0 && monthNum < 12) {
      return monthNames[monthNum];
    } else {
      throw new Error(
        "Invalid month number. Please provide a number between 0 and 11."
      );
    }
  }

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  function renderCells(monthDate) {
    const rows = [];
    let days = [];
    let day = 1;
    let date = 1;
    const firstDay = getStartDayOfMonth(
      monthDate.getFullYear(),
      monthDate.getMonth()
    );
    const monthDays = getDaysInMonth(
      monthDate.getFullYear(),
      monthDate.getMonth()
    );
    const today = startOfDay(new Date());

    for (let i = 0; i < 7; i++) {
      if (i < firstDay) {
        days.push(
          <td key={`${monthDate.getMonth()}-${i}`} className="blank-td"></td>
        );
      } else {
        const currentDateObj = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          date
        );
        const isSelectedStart = isSameDay(currentDateObj, range.start);
        const isSelectedEnd = isSameDay(currentDateObj, range.end);
        const isInRange =
          range.start &&
          range.end &&
          isWithinInterval(currentDateObj, {
            start: startOfDay(range.start),
            end: endOfDay(range.end),
          });
        const isPassed = isBefore(startOfDay(currentDateObj), today);

        days.push(
          <td
            key={date}
            className={`col cell ${
              isSelectedStart ? "selected selected-start" : ""
            } ${isSelectedEnd ? "selected selected-end" : ""} ${
              isInRange ? "in-range" : ""
            } ${isPassed ? "passed" : ""} ${
              isWithinInterval(currentDateObj, {
                start: startOfDay(range.start),
                end: endOfDay(hoveredDate),
              })
                ? "hovered-date"
                : ""
            } ${
              isSameDay(currentDateObj, hoveredDate)
                ? "hover-selected-date"
                : ""
            }`}
            onClick={() => onDateClick(currentDateObj)}
            onMouseEnter={() => onDateHover(currentDateObj)}
            onMouseLeave={() => onDateHover(null)}
          >
            {date}
          </td>
        );
        date++;
      }
    }
    rows.push(<tr key={`week-0`}>{days}</tr>);
    days = [];

    while (date <= monthDays) {
      for (let i = 0; i < 7; i++) {
        if (date <= monthDays) {
          const currentDateObj = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth(),
            date
          );
          const isSelectedStart = isSameDay(currentDateObj, range.start);
          const isSelectedEnd = isSameDay(currentDateObj, range.end);
          const isInRange =
            range.start &&
            range.end &&
            isWithinInterval(currentDateObj, {
              start: startOfDay(range.start),
              end: endOfDay(range.end),
            });
          const isPassed = isBefore(startOfDay(currentDateObj), today);

          days.push(
            <td
              key={date}
              className={`col cell ${
                isSelectedStart ? "selected selected-start" : ""
              } ${isSelectedEnd ? "selected selected-end" : ""} ${
                isInRange ? "in-range" : ""
              } ${isPassed ? "passed" : ""} ${
                isWithinInterval(currentDateObj, {
                  start: startOfDay(range.start),
                  end: endOfDay(hoveredDate),
                })
                  ? "hovered-date"
                  : ""
              } ${
                isSameDay(currentDateObj, hoveredDate)
                  ? "hover-selected-date"
                  : ""
              }`}
              onClick={() => onDateClick(currentDateObj)}
              onMouseEnter={() => onDateHover(currentDateObj)}
              onMouseLeave={() => onDateHover(null)}
            >
              {date}
            </td>
          );

          date++;
        } else {
          days.push(<td key={Math.random()} className="blank-td"></td>);
        }
      }

      rows.push(<tr key={`week-${day}`}>{days}</tr>);
      days = [];
      day++;
    }

    return <tbody>{rows}</tbody>;
  }

  return (
    <>
      <div className="calendar-picker">
        <table className="current-month">
          <thead>
            <tr className="prev-month-nav">
              <th
                className="prev-month-arrow"
                onClick={() => {
                  const newDate = subMonths(currentDate, 1);
                  if (!isBefore(newDate, new Date())) {
                    setCurrentDate(subMonths(currentDate, 2));
                  }
                }}
              >
                <img src={leftArrowIcon}></img>
              </th>
              <th className="month-name">{`${getMonthName(
                currentDate.getMonth()
              )} ${currentDate.getFullYear()}`}</th>
            </tr>
            <tr className="day-names">
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          {renderCells(currentDate)}
        </table>

        <table className="next-month">
          <thead>
            <tr className="next-month-nav">
              <th className="month-name">{`${getMonthName(
                nextMonthDate.getMonth()
              )} ${nextMonthDate.getFullYear()}`}</th>
              <th
                className="next-month-arrow"
                onClick={() => setCurrentDate(addMonths(currentDate, 2))}
              >
                <img src={RightArrowIcon}></img>
              </th>
            </tr>
            <tr className="day-names">
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          {renderCells(nextMonthDate)}
        </table>
      </div>
    </>
  );
}
