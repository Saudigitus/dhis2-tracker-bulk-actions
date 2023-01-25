import React from 'react'

function Body(props) {
    return (
        <tbody>{props.children}</tbody>
    )
}

Body.propTypes = {
    children: React.Component,
}

export default Body