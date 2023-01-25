import { ReactFinalForm, InputFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'

const { Field } = ReactFinalForm

function DateInput(props) {
    return (
        <Field
            {...props}
            type="date"
            component={InputFieldFF}
            validate={props.requered && hasValue}
            disabled={props.disabled}
        />
    )
}

export default DateInput