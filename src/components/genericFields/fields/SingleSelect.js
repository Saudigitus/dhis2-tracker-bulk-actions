
import React from 'react'
import { Field } from 'react-final-form'
import Select from 'react-select';



function SingleSelectField(props) {
    return (
        <div>
            <Field
                {...props}
            >
                {props => (
                    <div>
                        <Select
                            isDisabled={props.input.disabled}
                            isClearable={true}
                            isSearchable={true}
                            name={props.input.name}
                        />
                    </div>
                )}
            </Field>
        </div>
    )
}

export default SingleSelectField