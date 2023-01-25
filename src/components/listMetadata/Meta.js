import React, { useState, useEffect } from 'react'
import { TableMetadata } from '../table/TableMetadata.js'
import WithPadding from '../tamplate/WithPadding.js'
import EnrollmentFilter from './filter/enrollment/EnrollmentFilter.js'

// eslint-disable-next-line react/prop-types
function Content({ columnData, headers, loading, loadingHeader }) {
    const [headerColumns, setheaderColumns] = useState([])

    function updateVariables(values) {
        setheaderColumns(values)
    }

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (headers.length > 0 && headerColumns.length === 0) {
            setheaderColumns(headers)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headers])


    return (
        <div>
            <WithPadding>
                <EnrollmentFilter
                    updateVariables={updateVariables}
                    headers={headerColumns}
                />
            </WithPadding>

            <TableMetadata
                headers={headerColumns}
                loading={loading}
                columnData={columnData}
                loadingHeader={loadingHeader}
            />
        </div>
    )
}

export default Content