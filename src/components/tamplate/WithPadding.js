import React from 'react'


function WithPadding(props) {
    // eslint-disable-next-line react/prop-types
    const { children, p } = props;

    return (
        <div
            style={{ padding: p || "0.5rem" }}
        >
            {children}
        </div>
    )
}

export default WithPadding