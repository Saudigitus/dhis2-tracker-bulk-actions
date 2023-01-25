import { ReactFinalForm, CheckboxFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'


const { Field } = ReactFinalForm

function CheckInput(props) {
    return (
        <div>
            <Field
                {...props}
                component={CheckboxFieldFF}
                initialValue={false}
                validate={props.required && hasValue}
                disabled={props.disabled}
            />
        </div>
    )
}

export default CheckInput