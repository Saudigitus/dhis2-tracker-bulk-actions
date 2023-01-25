import { InputField } from '@dhis2/ui'
import React from 'react'

function Input(props) {
    return (
        <Radio
            // name={'checksToRun'}
            // value={'true'}
            // label={i18n.t('Only run selected checks')}
            // checked={runSelected}
            // onChange={toggle}
            {...props}
        />
    )
}

export default Input