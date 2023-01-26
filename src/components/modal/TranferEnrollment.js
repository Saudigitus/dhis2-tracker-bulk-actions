import React, { useState, useContext } from 'react'
import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Box,
    SingleSelectField,
    SingleSelectOption,
    Label
} from '@dhis2/ui'
import { Divider } from '@material-ui/core'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../../hooks/common/useQueryParams';
import { OrgUnitCard } from '../OrgUnitTree';
import { OrgUnitTreeComponent } from '..';
// import { OptionFields } from '../genericFields/fields/SingleSelect'

function Testing({ name, Component }) {
    return (
        <div style={{ display: "flex", marginTop: 15, marginBottom: 0 }}>
            <div>
                <Label color="muted" style={{ marginLeft: "5px", marginTop: 10 }}>{name}</Label >
            </div>
            <div style={{ marginLeft: "auto", width: 250, height: "auto" }}>
                <Component />
            </div>

        </div>
    )
}

const TranferEnrollment = ({ open, setopen }) => {
    const { programs = [] } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const programId = useQuery().get("programId")

    return (
        <Modal large open position={'middle'} onClose={() => setopen(false)}>
            <ModalTitle>{('Bulk enrollment')}</ModalTitle>
            <p />
            <ModalContent>
                <div style={{ marginTop: 20, marginLeft: 0, marginBottom: 0 }}>
                    <strong >Tranfer 20 Students</strong> {`to Organisation Unit`}
                    <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>
                    <Box width="100%">
                        {Testing({
                            name: "Program",
                            Component: () => (
                                <SingleSelectField size={"100%"} disabled selected={programId}>
                                    {programs?.map(x => <SingleSelectOption label={x.label} key={x.value} value={x.value} />)}
                                </SingleSelectField>
                            )
                        })}
                        <p />
                    </Box>
                    <Divider />
                    <Box width="100%">
                        {console.log("bug")}
                        {Testing({
                            name: "Organition Unit",
                            Component: () => <OrgUnitCard type={"bulk"}/>
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
