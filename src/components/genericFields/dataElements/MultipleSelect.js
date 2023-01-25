import React, { useState } from 'react'
import MultiSelect from '../fields/MultiSelect.js'

function MultipleSelect(props) {
    // eslint-disable-next-line react/prop-types
    const { options, loading, loadingText } = props
    const [dataElementsAssigned, setdataElementsAssigned] = useState([])

    const updateSection = (e) => {
        setdataElementsAssigned(e.selected)
    }

    return (
        <div>
            <MultiSelect
                selected={dataElementsAssigned}
                options={options}
                loading={loading}
                loadingText={loadingText}
                onChange={updateSection}
                placeholder={"MULTIPLE SELECT DATA ELEMENTS"}
            />
        </div>
    )
}

export default MultipleSelect