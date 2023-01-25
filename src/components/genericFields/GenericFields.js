import React from 'react'
import CheckInput from './fields/CheckInput.js'
import DateInput from './fields/DateInput.js'
import InputNumber from './fields/InputNumber.js'
import InputText from './fields/InputText.js'
import SelectMultiple from './fields/MultiSelect.js'
import SingleSelectField from './fields/SingleSelect.js'
import SwitchInput from './fields/SwitchInput.js'

// eslint-disable-next-line react/prop-types
function GenericFields({ attribute, localChange, index, disabled }) {
    // eslint-disable-next-line react/prop-types
    const { valueType } = attribute

    switch (valueType) {
        case 'BOOLEAN':
            return (
                <SwitchInput
                    // eslint-disable-next-line react/prop-types
                    checked={attribute.value}
                    {...attribute}
                    disabled={disabled}
                />
            )

        case 'NUMBER':
            return (
                <InputNumber type="number" {...attribute} disabled={disabled} />
            )

        case 'PHONE_NUMBER':
            return <InputText type="text" {...attribute} disabled={disabled} />

        case 'TEXT':
            return <InputText type="text" {...attribute} disabled={disabled} />

        case 'LONG_TEXT':
            return <InputText type="text" {...attribute} disabled={disabled} />

        // case 'FILE_RESOURCE':
        //   return (
        //     <InputText
        //       type="text"
        //       {...attribute}
        //disabled={disabled}
        //     />
        //   )

        case 'INTEGER':
            return (
                <InputNumber type="number" {...attribute} disabled={disabled} />
            )

        case 'INTEGER_POSITIVE':
            return (
                <InputNumber type="number" {...attribute} disabled={disabled} />
            )

        case 'INTEGER_ZERO_OR_POSITIVE':
            return (
                <InputNumber type="number" {...attribute} disabled={disabled} />
            )

        case 'DATE':
            return <DateInput {...attribute} disabled={disabled} />

        case 'TIME':
            return (
                <InputNumber type="time" {...attribute} disabled={disabled} />
            )

        case 'TRUE_ONLY':
            return (
                <CheckInput
                    // eslint-disable-next-line react/prop-types
                    checked={attribute.value}
                    {...attribute}
                    disabled={disabled}
                />
            )

        case 'MULTI_SELECT':
            return (
                <SelectMultiple
                    {...attribute}
                    disabled={disabled}
                    // eslint-disable-next-line react/prop-types
                    placeholder={attribute.label}
                    onChange={(e) => localChange(e.selected, index)}
                    // eslint-disable-next-line react/prop-types
                    selected={attribute.value}
                />
            )

        case 'LIST':
            return <SingleSelectField {...attribute} disabled={disabled} />

        default:
            return <span>Campo não mapeado</span>
    }
}

export default GenericFields
