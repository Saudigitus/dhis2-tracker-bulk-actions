import { CenteredContent, CircularLoader, Divider, Input } from '@dhis2/ui';
import React from 'react'
import VirtualizedSelect from 'react-select'
import "react-select/dist/react-select.css";
import style from "../card/card.module.css";


function ProgramSelect({ onChange, value, loading, options }) {

  if (loading) {
    return (
      <CenteredContent>
        <CircularLoader small />
      </CenteredContent>
    )
  }

  return (
    <div style={{ maxHeight: 200, zIndex: 1000 }} >
      <VirtualizedSelect
        style={{ zIndex: 1000 }}
        options={options}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default ProgramSelect

