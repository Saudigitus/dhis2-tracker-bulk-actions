/* eslint-disable import/extensions */
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { useContext, useEffect } from 'react';
import { AppBarContext } from '../../contexts';
import { useParams } from '../../hooks/common/useQueryParams';
import style from './appbar.module.css'
import { itens } from './data';
import { useConfig } from '@dhis2/app-runtime';
import { useGetPrograms } from '../../hooks/programs/useGetPrograms';

function AppBar() {
    const { baseUrl } = useConfig();
    const { selectedOu, setSelectedOu } = useContext(AppBarContext)
    const { remove, add, useQuery } = useParams()
    const { loading, programs } = useGetPrograms("WITH_REGISTRATION")

    const programId = useQuery().get("programId")

    return (
        <div className={style.appBarContainer}>
            {
                itens(selectedOu, setSelectedOu, programId, remove, add, loading, programs ).map((iten, index) => (
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
        </div>
    )
}
export default AppBar