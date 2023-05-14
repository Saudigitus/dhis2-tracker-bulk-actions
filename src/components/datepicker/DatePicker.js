/* eslint-disable react/prop-types */
import React from 'react';
import { Calendar } from 'react-calendar';
import "react-calendar/dist/Calendar.css"



const DatePicker = ({ value, onChange, maxDate }) => {
  return (
    <Calendar onChange={onChange} value={value} maxDate={maxDate || undefined} />
  )
}

export default DatePicker