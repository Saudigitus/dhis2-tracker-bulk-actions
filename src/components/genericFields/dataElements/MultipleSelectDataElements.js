import React from 'react'
import { useSection } from '../../../hooks/dataElements/MultipleSelect.js'
import MultipleSelect from './MultipleSelect.js'

const sectionId = "UAsJmFywY1z"
function MultipleSelectDataElements() {
    const { error, loading, options, validationText } = useSection({ id: sectionId })

    if (error) {
        return validationText
    }

    return (
        <div>
            <MultipleSelect
                options={options}
                loading={loading}
                loadingText="Loading options"
            />
        </div>
    )
}

export default MultipleSelectDataElements