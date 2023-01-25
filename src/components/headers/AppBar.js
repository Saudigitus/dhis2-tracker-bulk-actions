/* eslint-disable import/extensions */
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { useContext, useEffect } from 'react';
import { AppBarContext } from '../../contexts';
import { useParams } from '../../hooks/common/useQueryParams';
import style from './appbar.module.css'
import { itens } from './data';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useConfig } from '@dhis2/app-runtime';

function AppBar() {
    const { baseUrl } = useConfig();
    const { selectedOu, setSelectedOu, startDate, setStartDate, endDate, setEndDate } = useContext(AppBarContext)
    const { remove, add, useQuery } = useParams()

    const sDate = useQuery().get("startDate")
    const eDate = useQuery().get("endDate")
    const programId = useQuery().get("program")

    useEffect(() => {
        if (sDate || eDate) {
            setStartDate(sDate)
            setEndDate(eDate)
        }
    }, [])

    return (
        <div className={style.appBarContainer}>
            {
                itens(selectedOu, setSelectedOu, startDate, setStartDate, endDate, setEndDate, remove, add).map((iten, index) => (
                    <div key={index} className={style.menuContainer}>
                        <h4>{iten.title}</h4>
                        {
                            iten.value ?
                                <div className={style.selectedItem}>
                                    <div className={style.selectionArea}>
                                        <div className={style.iconArea}>{iten.icone()}</div>
                                        <div>{iten.selectedItem}</div>
                                    </div>
                                    <IconButton onClick={iten.setValue} size="small" aria-label="delete">
                                        <ClearIcon style={{ fontSize: '1.2rem' }} />
                                    </IconButton>
                                </div>
                                : iten.action()
                        }
                    </div>
                ))
            }

            <div className={style.appBarAddButton}>
                    <IconButton onClick={()=>window.open(`${baseUrl}/dhis-web-capture/index.html#/?program=${programId}`, "new blank")}>
                        <AddCircleOutlineIcon className={style.appBarIconButton} />
                    </IconButton>
            </div>
        </div>
    )
}
export default AppBar