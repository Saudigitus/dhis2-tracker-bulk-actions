import React from 'react'

const borderTypes = {
    all: { border: "0.0625rem solid rgba(224, 224, 224, 1)" },
    bottom: { borderBottom: "0.0625rem solid rgba(224, 224, 224, 1)" },
    top: { borderTop: "0.0625rem solid rgba(224, 224, 224, 1)" },

}

function WithBorder(props) {
    // eslint-disable-next-line react/prop-types
    const { children, type } = props;

    return (
        <div
            data-test="workinglists-border"
            style={borderTypes[type]}
        >
            {children}
        </div>
    )
}

export default WithBorder