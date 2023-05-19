import { Button, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import SimpleMenu from '../../selectColumns/MenuBulkAction.js'
import FilterChips from './FilterChips.js'





// eslint-disable-next-line react/prop-types
function OtherFilters({ onFilterByEnrollment, selectedFilter, setopenModalBulkTranfer, modalType, setopenModalBulkDelete, disabled }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const filters = [
        {
            children: "Active enrollments",
            filter: "ACTIVE"
        },
        {
            children: "Completed enrollments",
            filter: "COMPLETED"
        },
        {
            children: "Cancelled enrollments",
            filter: "CANCELLED"
        },
    ]

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    {filters.map(x =>
                        <FilterChips small selected={selectedFilter === x.filter} key={x.children} {...x} onClick={() => onFilterByEnrollment(selectedFilter === x.filter ? null : x.filter)} />
                    )}

                </div>
                <div>
                    <Button style={{
                        color: "rgb(33, 41, 52)",
                        fontSize: 14,
                        textTransform: "none",
                        fontWeight: 400,
                    }}
                        size="small"
                        variant='outlined'
                        onClick={handleClick}
                    >
                        Bulk actions
                    </Button>
                    <SimpleMenu
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        setopenModalBulkTranfer={setopenModalBulkTranfer}
                        setopenModalBulkDelete={setopenModalBulkDelete}
                        modalType={modalType}
                        programStatus={selectedFilter}
                        disabled={disabled}
                    />
                </div>

            </div>
        </>
    )
}

export default OtherFilters