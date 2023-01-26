import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Box,
    Label
} from '@dhis2/ui'
import { Divider, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import React, { useState, useContext } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../../hooks/common/useQueryParams';
import { OrgUnitCard } from '../OrgUnitTree';
// import { OptionFields } from '../genericFields/fields/SingleSelect'

function Testing({ name, Component }) {
    return (
        <div style={{ display: "flex", marginTop: 15, marginBottom: 0 }}>
            <div>
                <Label color="muted" style={{ marginLeft: "5px", marginTop: 10, }}> <span style={{ fontWeight: "bold" }}>{name}</span></Label >
            </div>
            <div style={{ marginLeft: "auto", width: 350, height: "auto" }}>
                <Component />
            </div>

        </div>
    )
}

const TranferEnrollment = ({ open, setopen }) => {
    const { programs = [], selectRows = [] } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const programId = useQuery().get("programId")
    const ouName = useQuery().get("ouName")
    const [orgUnitSelected, setorgUnitSelected] = useState({})

    function nameOfTEIType() {
        return programs.find(x => x.value === programId)?.trackedEntityType?.name
    }

    return (
        <Modal large open={open} position={'middle'} onClose={() => setopen(false)}>
            <ModalTitle>{('Bulk enrollment')}</ModalTitle>
            <p />
            <ModalContent>
                <div style={{ marginTop: 18, marginLeft: 0, marginBottom: 0 }}>
                    Transfer {selectRows.length} {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected.displayName || "Organisation Unit"}`}</strong>
                    <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>
                    <Box width="100%">
                        {Testing({
                            name: "Program",
                            Component: () => (
                                <Label>
                                    {programs.find(program => program.value === programId)?.label}
                                </Label>
                            )
                        })}
                        <p />
                    </Box>
                    <Divider />
                    <Box width="100%">
                        {Testing({
                            name: "Organisation Unit",
                            Component: () => (
                                Object.keys(orgUnitSelected).length == 0 ?
                                    <OrgUnitCard type={"bulk"}
                                        value={orgUnitSelected?.selected}
                                        onChange={(e) => setorgUnitSelected(e)}
                                    /> :
                                    <div style={{ display: "flex" }}>
                                        <Label>
                                            {orgUnitSelected.displayName}
                                        </Label>
                                        <IconButton size='small' onClick={() => setorgUnitSelected({})} style={{ marginLeft: "auto", marginTop: -5 }}>
                                            <Close size='small' />
                                        </IconButton>
                                    </div>
                            )
                        })}
                        <p />
                    </Box>

                </div>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary name="hide-modal" onClick={() => setopen(false)}>
                        {('Cancel')}
                    </Button>
                    <Button
                        primary
                        name="insert-preset"
                    >
                        {('Transfer')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal >
    )
}

export default TranferEnrollment
