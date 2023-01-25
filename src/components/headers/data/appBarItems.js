/* eslint-disable import/extensions */
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EventIcon from '@material-ui/icons/Event';
import React from 'react'
import { formaterToIsoDate } from '../../../utils/commons/dateFormatter';
import DatePicker from '../../datepicker/DatePicker';
import { OrgUnitCard } from '../../OrgUnitTree';

const itens = (selected, setSelectedOu, startDate, setStartDate, endDate, setEndDate, remove, add) => [
    {
        title: "Unidade Organizacional",
        icone: () => <AccountTreeIcon style={{ fontSize: '1.2rem', color: 'rgba(0, 0, 0, 0.54)' }} />,
        selectedItem: selected?.displayName,
        action: () => <OrgUnitCard expanded={false} selected={selected} onChange={
            (e) => {
                setSelectedOu({
                    id: e.selected[0].split('/').pop(),
                    selected: e.selected,
                    displayName: e.displayName
                });
                add("ou", e.selected[0].split('/').pop());
                add("ouName",e.displayName)
            }
        } />,
        value: selected,
        setValue: () => {setSelectedOu(); remove("ou"); remove("ouName")}
    },
]

export { itens };