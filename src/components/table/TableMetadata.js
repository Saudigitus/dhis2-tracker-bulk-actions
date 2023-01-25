import i18n from '@dhis2/d2-i18n';
import { CenteredContent, CircularLoader } from '@dhis2/ui';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react'
import Body from './components/Body.js'
import Cell from './components/Cell.js'
import Head from './components/Head.js'
import HeaderCell from './components/HeaderCell.js'
import Row from './components/Row.js'
import Table from './components/Table.js'

const getStyles = (theme) => ({
    tableContainer: {
        overflowX: 'auto',
    },
    table: {},
    row: { width: "100%" },
    loadingRow: {
        height: 100,
    },
    dataRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F1FBFF',
        },
    },

    cell: {
        padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 7}px ${theme.spacing.unit /
            2}px ${theme.spacing.unit * 3}px`,
        '&:last-child': {
            paddingRight: theme.spacing.unit * 3,
        },
        borderBottomColor: "rgba(224, 224, 224, 1)",
    },
    bodyCell: {
        fontSize: theme.typography.pxToRem(13),
        color: theme.palette.text.primary,
    },
    staticHeaderCell: {
        width: 1,
    },
    headerCell: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
        // $FlowFixMe
        fontWeight: theme.typography.fontWeightMedium,
    },
    loadingCell: {
        textAlign: 'center',
    },
});

const TableComponent = (props) => {
    // eslint-disable-next-line react/prop-types
    const { classes, headers = [], loading, columnData = [], loadingHeader } = props;

    const columnHeaderInstances = []
    const visibleColumns = headers?.filter(column => column?.visible) || []


    function renderHeaderRow(columns) {
        // eslint-disable-next-line react/prop-types
        const headerCells = columns?.map((column, index) => (
            <HeaderCell
                innerRef={(instance) => { setColumnWidth(instance, index); }}
                key={column.id}
                // eslint-disable-next-line react/prop-types
                className={classNames(classes.cell, classes.headerCell)}
            >
                {column.header}
            </HeaderCell>
        ))

        return (
            <Row
                // eslint-disable-next-line react/prop-types
                className={classes.row}
            >
                {headerCells}
            </Row>
        )
    }

    function setColumnWidth(columnInstance, index) {
        // eslint-disable-next-line react/prop-types
        if (columnInstance) {
            columnHeaderInstances[index] = columnInstance;
        }
    }

    function renderBody(columns) {
        const columnsCount = columns?.length;

        return renderRows(columns, columnsCount);
    }

    function renderRows() {
        if (!columnData || columnData.length === 0) {
            return (
                <Row
                    className={classes.row}
                >
                    <Cell
                        className={classNames(classes.cell, classes.bodyCell)}
                        colspan={headers.length}
                    >
                        {i18n.t('No items to display')}
                    </Cell>
                </Row>
            );
        }

        return (
            <React.Fragment>
                {
                    columnData
                        .map((row, index) => {
                            const cells = visibleColumns
                                ?.map(column => (
                                    <Cell
                                        key={column.id}
                                        className={classNames(classes.cell, classes.bodyCell)}
                                    >
                                        <div>
                                            {
                                                typeof row[column.id] === "object" || Array.isArray(row[column.id]) ? "" : row[column.id]
                                            }
                                        </div>
                                    </Cell>
                                ));
                            return (
                                <Row
                                    key={index}
                                    id={index}
                                    className={classNames(classes.row, classes.dataRow)}
                                    onClick={() => alert(row.id)}
                                >
                                    {cells}
                                </Row>
                            );
                        })
                }
            </React.Fragment>
        );
    }

    return (
        <div
            // eslint-disable-next-line react/prop-types
            className={classes.tableContainer}
        >
            <Table
                // eslint-disable-next-line react/prop-types
                className={classes.table}
                data-test="online-list-table"
            >
                {loadingHeader ?
                    <div style={{ height: 300 }}>
                        <CenteredContent>
                            <CircularLoader />
                        </CenteredContent>
                    </div>
                    :
                    <>
                        <Head>
                            {renderHeaderRow(visibleColumns)}
                        </Head>
                        <Body
                            data-test="online-list-body"
                        >
                            {loading ?
                                <div style={{ height: 300 }}>
                                    <CenteredContent>
                                        <CircularLoader />
                                    </CenteredContent>
                                </div>
                                :
                                renderBody(visibleColumns)
                            }
                        </Body>
                    </>
                }
            </Table>
        </div>
    )
}

export const TableMetadata = withStyles(getStyles)(TableComponent);