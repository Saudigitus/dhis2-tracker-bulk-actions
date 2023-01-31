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
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles';

function AppBar() {
    const { baseUrl } = useConfig();
    const { selectedOu, setSelectedOu } = useContext(AppBarContext)
    const { remove, add, useQuery } = useParams()
    const { loading, programs } = useGetPrograms("WITH_REGISTRATION")
    const { setInitOu, initOU, } = useContext(AppBarContext)
    const { userOrgUnit = { error: "", data: "" } } = useContext(GeneratedVaribles)
    const ou = useQuery().get("ou")
    const ouName = useQuery().get("ouName")

    const programId = useQuery().get("programId")

    useEffect(() => {
        if (!userOrgUnit?.error && userOrgUnit?.data?.results?.organisationUnits?.length > 0) {
            if (userOrgUnit?.data && ou) {
                setSelectedOu({
                    id: ou,
                    selected: ou,
                    displayName: ouName,
                })
            } else
                if (userOrgUnit?.data && !initOU) {
                    setSelectedOu({
                        id: userOrgUnit?.data.results.organisationUnits[0].id,
                        selected: userOrgUnit?.data.results.organisationUnits[0].id,
                        displayName: userOrgUnit?.data.results.organisationUnits[0].displayName,
                    })

                    add("ou", userOrgUnit?.data.results.organisationUnits[0].id)
                    add("ouName", userOrgUnit?.data.results.organisationUnits[0].displayName)
                    setInitOu(true)
                }
        }

    }, [userOrgUnit?.data]);

    return (
        <div className={style.appBarContainer} style={{ marginBottom: 10 }}>
            {
                itens(selectedOu, setSelectedOu, programId, remove, add, loading, programs).map((iten, index) => (
                    <div key={index} className={style.menuContainer}>
                        <h4>{iten.title}</h4>
                        {
                            iten.value ?
                                <div className={style.selectedItem}>
                                    <div className={style.selectionArea}>
                                        <div className={style.iconArea}>{iten.icone()}</div>
                                        <div style={{textOverflow:"ellipsis", overflow: "hidden", whiteSpace:"nowrap"}}>{iten.selectedItem}</div>
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