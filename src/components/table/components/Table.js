import classNames from 'classnames';
import propType from 'prop-types';
import React from 'react'
import defaultClasses from './table.module.css';

function Table(props) {
    const { children, className, ...passOnProps } = props;
    const classes = classNames(defaultClasses.table, className);
    return (
        <table
            className={classes}
            {...passOnProps}
        >
            {children}
        </table>
    );
}

Table.propTypes = {
    children: React.Node,
    className: propType.string,
};

export default Table