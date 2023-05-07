import { IconButton, TablePagination } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React from 'react'
import Select from 'react-select';
import defaultClasses from './table.module.css';


// eslint-disable-next-line react/prop-types
const Pagination = ({ page, rowsPerPage, onPageChange, onRowsPerPageChange, totalPages, loading, totalPerPage }) => {

    function isDesabled() {
        if (totalPerPage < rowsPerPage) {
            return true
        }
        return false
    }

    const rowsPerPageNum = [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 30, label: 30 },
    ]

    return (
        <div
            data-test="pagination"
            className={defaultClasses.pagination}
            style={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <div />
            <div
                className={defaultClasses.rootPagination}

            >

                <span className={defaultClasses.textPagination}>
                    Rows per page:
                </span>

                <Select
                    className={defaultClasses.textPagination}
                    value={rowsPerPage}
                    clearValueText={false}
                    style={{ maxWidth: 50, marginTop: -10, height: 10, marginRight: 10 }}
                    options={rowsPerPageNum}
                    clearable={false}
                    searchable={false}
                    onChange={onRowsPerPageChange}
                    menuContainerStyle={{ top: 'auto', bottom: '100%' }}
                />

                <span className={defaultClasses.textPagination}>
                    Page {page}
                </span>
                <div style={{ marginRight: 10 }} />
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

export default Pagination