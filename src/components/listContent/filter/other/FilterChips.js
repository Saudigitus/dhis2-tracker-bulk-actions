import { Chip } from '@dhis2/ui'
import React from 'react'

function FilterChips(props) {
    return (
        <Chip small {...props} >
            {props.children}
        </Chip>
    )
}

export default FilterChips