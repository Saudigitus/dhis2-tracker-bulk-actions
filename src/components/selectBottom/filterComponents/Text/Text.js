import { TextField } from '@material-ui/core';
import React from 'react'

function TextFilter(props) {
    // eslint-disable-next-line react/prop-types
    const { value, onChange, id } = props;
    // console.log(props);
    return (
        <div>
            <TextField
                value={value}
                onChange={(e) => {
                    onChange(e.target.value, id)
                }}
                placeholder={"Contains Text"}
                // onBlur={handleBlur}
                // {...props}
            />
        </div>
    )
}

export default TextFilter