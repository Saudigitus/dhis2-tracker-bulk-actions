import { ReactFinalForm, SwitchFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'


const { Field } = ReactFinalForm

function SwitchInput(props) {
    return (
        <Field
            type="checkbox"
            {...props}
            component={SwitchFieldFF}
            validate={props.required && hasValue}
            disabled={props.disabled}
        />
    )
}

export default SwitchInput