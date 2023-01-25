import { CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState, useEffect } from 'react'
import { DataTable } from '../table/DataTable.js'
import EnrollmentFilter from './filter/enrollment/EnrollmentFilter.js'

// eslint-disable-next-line react/prop-types
function Content({ columnData, headers, loading, loadingHeader, type, loadingOptionSet }) {
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
            {
                loadingOptionSet ?
                    <CenteredContent className="py-3">
                        <CircularLoader />
                    </CenteredContent>
                    :
                    <EnrollmentFilter
                        updateVariables={updateVariables}
                        headers={headerColumns}
                        type={type}
                    />
            }

            <DataTable
                headers={headerColumns}
                loading={loading}
                columnData={columnData}
                loadingHeader={loadingHeader}
            />
        </div>
    )
}

export default Content