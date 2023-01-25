import React from 'react'
import FilterChips from './FilterChips.js'





// eslint-disable-next-line react/prop-types
function OtherFilters({ onFilterByEnrollment, selectedFilter }) {
    const filters = [
        {
            children: "Todos eventos",
            filter: "ACTIVE"
        }
    ]

    return (
        <div>
            {filters.map(x =>
                <FilterChips selected={selectedFilter === x.filter} key={x.children} {...x} onClick={() => onFilterByEnrollment(x.filter)} />
            )}
        </div>
    )
}

export default OtherFilters