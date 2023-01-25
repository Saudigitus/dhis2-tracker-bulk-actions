/* eslint-disable react/prop-types */
import React from 'react';
import {Calendar} from 'react-calendar';
import "react-calendar/dist/Calendar.css"



const DatePicker = ({value,onChange}) => {
  return (
    <Calendar onChange={onChange} value={value} />
    )
}

export default DatePicker