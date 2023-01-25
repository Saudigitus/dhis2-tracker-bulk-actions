import { MultiSelect, MultiSelectOption } from '@dhis2/ui'
import React from 'react'

function SelectMultiple(props) {
    return (
        <div>
            <MultiSelect
                className="select"
                {...props}
                disabled={props.disabled}

            >
                {props?.options?.map(x =>
                    <MultiSelectOption key={x.value} label={x.label} value={x.value} />
                )}
            </MultiSelect>
        </div>
    )
}

export default SelectMultiple