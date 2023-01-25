import classNames from 'classnames';
import PropTypes from "prop-types";
import React from 'react'
import defaultClasses from './table.module.css';

const HeadCell = (props) => {
    const { children, className, innerRef, ...passOnProps } = props;
    const classes = classNames(defaultClasses.tableCell, defaultClasses.tableCellHeader, className);
    return (
        <td
            ref={innerRef}
            className={classes}
            {...passOnProps}
        >
            {children}
        </td>
    )
}

HeadCell.propTypes = {
    children: React.Component,
    className: PropTypes.object,
    innerRef: PropTypes.object,
    passOnProps: PropTypes.object,
    table: PropTypes.object,
};

export default HeadCell