import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createNumberRange,
} from '@dhis2/ui'
import React from 'react'
import style from "./fields.module.css";
// eslint-disable-next-line import/extensions
import { formatToString } from './formatters'

const { Field } = ReactFinalForm

// Omitting the underscore here since it messes up i18n
const lowerbound = 1
const upperbound = 86400

const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(lowerbound, upperbound)
)

function InputNumber(props) {
    return (
        <Field
            component={InputFieldFF}
            // eslint-disable-next-line react/prop-types
            validate={props.required && VALIDATOR}
            // label={i18n.t('Delay')}
            type="number"
            format={formatToString}
            // helpText={formatToString && 'Please provide a valid number'}
            // required
            disabled={props.disabled}
            {...props}
            className={style.textfield}
        />
    )
}

export default InputNumber