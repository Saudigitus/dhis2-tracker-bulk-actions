/* eslint-disable react/prop-types */
import i18n from '@dhis2/d2-i18n';
import { CenteredContent, CircularLoader } from '@dhis2/ui';
import { IconButton, TableSortLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Check, MoreHoriz, Remove } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles.js';
import { useParams } from '../../hooks/common/useQueryParams.js';
import ActionsMenu from '../actions/menu.js';
import Body from './components/Body.js'
import Cell from './components/Cell.js'
import Head from './components/Head.js'
import HeaderCell from './components/HeaderCell.js'
import Row from './components/Row.js'
import Table from './components/Table.js'
import SortLabelWrapper from './sort/SortLabelWrapper.js';

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
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


const TableComponent = (props) => {
    const { order, orderBy, setOrder, setOrderBy } = useContext(GeneratedVaribles)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };


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
                <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                >
                    {column.header}
                    {orderBy === column.id ? (
                        <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                    ) : null}
                </TableSortLabel>
            </HeaderCell>
        ))

        return (
            <Row
                // eslint-disable-next-line react/prop-types
                className={classes.row}
            >
                {headerCells}
                <HeaderCell
                    className={classNames(classes.cell, classes.headerCell)}
                >
                    Estado
                </HeaderCell>
                <HeaderCell
                    className={classNames(classes.cell, classes.headerCell)}
                >
                    Acções
                </HeaderCell>
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
                                            {row[column.id]}
                                        </div>
                                    </Cell>
                                ));
                            return (
                                <Row
                                    key={index}
                                    // style={{ backgroundColor: row.id === props?.rowData?.id ? 'rgba(160, 201, 255,0.5)' : "" }}
                                    id={index}
                                    className={classNames(classes.row, classes.dataRow)}
                                    onClick={() => { console.log(row) }}
                                >
                                    {cells}
                                    <Cell
                                        key={"settings"}
                                        className={classNames(classes.cell, classes.bodyCell)}
                                    >
                                        {row["u7dfk89C9X7"] ?
                                            <Check aria-label='Enviado para investigação' style={{ color: '#00EB62' }} />
                                            :
                                            <Remove style={{ color: "rgba(0, 0, 0, 0.54)" }} />
                                        }
                                    </Cell>
                                    <Cell
                                        key={"settings"}
                                        className={classNames(classes.cell, classes.bodyCell)}
                                    >
                                        <ActionsMenu row={row} />
                                    </Cell>
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

export const DataTable = withStyles(getStyles)(TableComponent);