import React from 'react'

const Footer = (props) => {
    return (
        <tfoot>
            {props.children}
        </tfoot>
    );
}

Footer.propTypes = {
    children: React.Component,
    // table: PropTypes.object,
};

export default Footer