import { IconButton, TablePagination } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React from 'react'
import defaultClasses from './table.module.css';


// eslint-disable-next-line react/prop-types
const Pagination = ({ page, rowsPerPage, onPageChange, onRowsPerPageChange, totalPages, loading, totalPerPage }) => {
    console.log(page);


    function isDesabled() {
        if (totalPerPage < rowsPerPage) {
            return true
        }
        return false
    }

    return (
        <div
            data-test="pagination"
            className={defaultClasses.pagination}
        >
            <div />
            <div
                className={defaultClasses.rootPagination}
            >
                <span className={defaultClasses.textPagination}>
                    Rows per page: {rowsPerPage}
                </span>
                <span className={defaultClasses.textPagination}>
                    Page {page}
                </span>
                <IconButton
                    style={{ paddingRight: 15 }}

                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1 || loading}
                    aria-label="Previous Page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    style={{ paddingRight: 12 }}

                    onClick={() => { onPageChange(page + 1); }}
                    disabled={isDesabled() || loading}
                    aria-label="Next Page"
                >
                    <KeyboardArrowRight />
                </IconButton>
            </div>
        </div>
    )
}

// <TablePagination
//     size="small"
//     component="div"
//     count={totalPages}
//     page={page}
//     onPageChange={onPageChange}
//     rowsPerPage={rowsPerPage}
//     onRowsPerPageChange={onRowsPerPageChange}
// />

export default Pagination