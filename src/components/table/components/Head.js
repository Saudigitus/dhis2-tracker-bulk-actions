import React from 'react'

const Head = (props) => {
    return (
        <thead>
            {props.children}
        </thead>
    )
}

Head.propTypes = {
    children: React.Component,
    // table: PropTypes.object,
};

export default Head