import { Divider, Input } from '@dhis2/ui';
import React from 'react'
import VirtualizedSelect from 'react-select'
import "react-select/dist/react-select.css";
import style from "../card/card.module.css";


function ProgramSelect({ onChange, value }) {
  const options = [
    { label: "One", value: "IpHINAT79UW" },
    { label: "Two", value: "IpHINAT79UW" },
  ]

  return (
    <div className={style.orgUnitCard}>
      <VirtualizedSelect
        options={options}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default ProgramSelect

