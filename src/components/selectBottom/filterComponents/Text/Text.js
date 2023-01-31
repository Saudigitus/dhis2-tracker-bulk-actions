import { TextField } from '@material-ui/core';
import React from 'react'

function TextFilter(props) {
    const { value, handleChange } = props;

    return (
        <div>
            <TextField
                value={value || ''}
                onChange={handleChange}
                placeholder={"Contains Text"}
                // onBlur={handleBlur}
                {...props}
            />
        </div>
    )
}

export default TextFilter