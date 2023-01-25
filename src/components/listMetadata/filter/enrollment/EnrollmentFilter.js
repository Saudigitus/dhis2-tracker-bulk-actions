import React from 'react'
// eslint-disable-next-line import/extensions
import SelectColumns from '../../selectColumns/SelectColumns'
// eslint-disable-next-line import/extensions
import ContentFilter from './ContentFilter'

// eslint-disable-next-line react/prop-types
function EnrollmentFilter({ headers, updateVariables }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ContentFilter />
            <SelectColumns
                updateVariables={updateVariables}
                headers={headers}
            />
        </div>
    )
}

export default EnrollmentFilter