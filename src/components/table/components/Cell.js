import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react'
import defaultClasses from './table.module.css';

function Cell(props) {
    const { children, className, passOnProps, table, colspan } = props;

    const classes = classNames(
        defaultClasses.tableCell,
        {
            [defaultClasses.tableCellBody]: !table,
            [defaultClasses.tableCellHeader]: table && table.head,
            [defaultClasses.tableCellFooter]: table && table.footer,
        },
        className,
    );
    return (
        <td
            className={classes}
            {...passOnProps}
            colSpan={colspan}
        >
            {children}
        </td>
    );
};

Cell.propTypes = {
    children: React.Component,
    className: PropTypes.object,
    passOnProps: PropTypes.object,
    table: PropTypes.object,
};

export default Cell