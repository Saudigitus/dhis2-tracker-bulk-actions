import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react'
import defaultClasses from './table.module.css';

function Row(props) {
    const { children, className, table, ...passOnProps } = props;

    const classes = classNames(
        defaultClasses.tableRow,
        {
            [defaultClasses.tableRowBody]: !table,
            [defaultClasses.tableRowHeader]: table && table.head,
            [defaultClasses.tableRowFooter]: table && table.footer,
        },
        className,
    );

    return (
        <tr
            className={classes}
            data-test="table-row"
            {...passOnProps}
        >
            {children}
        </tr>
    )
}

Row.propTypes = {
    children: React.Component,
    className: PropTypes.object,
    passOnProps: PropTypes.object,
    table: PropTypes.object,
};

export default Row