/* eslint-disable import/extensions */
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EventIcon from '@material-ui/icons/Event';
import React from 'react'
import { OrgUnitCard } from '../../OrgUnitTree';
import ProgramSelect from '../../SingleSelectComponent/SingleSelectField';

const itens = (selected, setSelectedOu, programId, remove, add, loading, programs, setprogramSelected, setorgUnitSelected) => [
    {
        title: "Select Program",
        icone: () => <EventIcon style={{ fontSize: '1.2rem', color: 'rgba(0, 0, 0, 0.54)' }} />,
        selectedItem: programs?.find((program) => program.value === programId)?.label,
        action: () => <ProgramSelect helperText={"Select Program"}  options={programs} loading={loading} onChange={
            (v, e) => {
                add("programId", e.value);
                setprogramSelected(e)
            }
        } />,
        value: programId,
        setValue: (e) => { remove("programId") }
    },
    {
        title: "Select registering unit",
        icone: () => <AccountTreeIcon style={{ fontSize: '1.2rem', color: 'rgba(0, 0, 0, 0.54)' }} />,
        selectedItem: selected?.displayName,
        action: () => <OrgUnitCard expanded={false} selected={selected} onChange={
            (e) => {
                setSelectedOu({
                    id: e.selected[0].split('/').pop(),
                    selected: e.selected,
                    displayName: e.displayName
                });
                setorgUnitSelected(e.selected[0].split('/').pop())
                add("ou", e.selected[0].split('/').pop());
                add("ouName", e.displayName)
            }
        } />,
        value: selected,
        setValue: () => { setSelectedOu(); remove("ou"); remove("ouName") }
    },
]

export { itens };