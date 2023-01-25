/* eslint-disable react/prop-types */
import { Box, Card, CenteredContent, CircularLoader } from '@dhis2/ui';
import { CircularProgress, Divider, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './card.module.css';

function CardDashboardCNPA(props) {
    const { loading, totalPagesToday, totalPages } = props;

    return (
        <Box height="265px" width="206px">

            <Card className={style.cardContainer}>
                <div className={style.cardHeader}>
                    <img src={props.image} />
                </div>
                <Divider />
                <div className={style.cardTitle}>
                    {props.title}
                </div>
                <Divider />
                <div className={style.cardStatistics}>
                    <div className={style.cardStatisticsHoje}>
                        <span className={style.cardStatisticsHojeValue}>
                            {loading ?
                                <CenteredContent>
                                    <CircularProgress size={21} />
                                </CenteredContent>
                                : totalPagesToday}
                        </span>
                        <span>Hoje</span>
                    </div>
                    <div className={style.cardStatisticsTotal}>

                        <span className={style.cardStatisticsTotalValue}>
                            {loading ?
                                <CenteredContent>
                                    <CircularProgress size={21} />
                                </CenteredContent>
                                : totalPages}
                        </span>
                        <span >Total</span>
                    </div>
                </div>
                <Divider />
                <div className={style.cardActions}>
                    <Tooltip title={`Adicionar ${props.title}`}>
                        <Link to={props.createLink}>
                            <IconButton size="small" aria-label="delete">
                                <AddIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    &nbsp;
                    <Tooltip title={`Listar ${props.title}`}>
                        <Link to={props.listLink}>
                            <IconButton size="small" aria-label="delete">
                                <MenuIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </div>
            </Card>
        </Box >
    )
}
export default CardDashboardCNPA;