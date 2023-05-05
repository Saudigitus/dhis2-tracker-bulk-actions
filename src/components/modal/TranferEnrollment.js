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
import { Divider, IconButton, LinearProgress } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons';
import React, { useState, useContext } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../../hooks/common/useQueryParams';
import { useVerifyOuAcess } from '../../hooks/programs/useVerifyOuAcess';
import { useTransferTEI } from '../../hooks/transfer/useTransfer';
import { OrgUnitCard } from '../OrgUnitTree';
import { ConfirmBulkAction } from './ConfirmBulkAction';
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
    const { programs = [], selectRows = [], tEItransfered = [], setTEItransfered, setselectRows, allTeisFormated } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const programId = useQuery().get("programId")
    const ouName = useQuery().get("ouName")
    const [orgUnitSelected, setorgUnitSelected] = useState({})
    const { loading, transferTEI } = useTransferTEI()
    const { verifyAcess } = useVerifyOuAcess()
    const [openModalConfirmBulk, setOpenModalConfirmBulk] = useState(false)
    const handleCloseConfirmAction = () => setOpenModalConfirmBulk(false);

    function nameOfTEIType() {
        return programs.find(x => x.value === programId)?.trackedEntityType?.name || ""
    }

    function currentDetailsProgram() {
        return programs.find(x => x.value === programId)
    }

    function getTeiDetails() {
        const teisSelected = []
        for (const tei of selectRows) {
            const selectedTei = allTeisFormated.find(x => x.id === tei)

            const teiData = `${currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${selectedTei?.[currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id]};${currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${selectedTei?.[currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id]}`
            teisSelected.push({ id: tei, name: teiData, isSelected: true })

        }
        return teisSelected
    }
    const selectedTeis = getTeiDetails(currentDetailsProgram())

    return (
        <Modal large open={open} position={'middle'} onClose={() => setopen(false)}>
            <ModalTitle>{('Permanent transfer')}</ModalTitle>
            <p />
            <ModalContent>
                {loading && <LinearProgress />}
                {
                    tEItransfered.length === 0 ?
                        <div style={{ marginTop: 18, marginLeft: 0, marginBottom: 0 }}>
                            Transfer <strong>{selectRows.length}</strong>  {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected.displayName || "Organisation Unit"}`}</strong>
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
                                                    {verifyAcess(currentDetailsProgram()?.value, orgUnitSelected.id) ?
                                                        orgUnitSelected.displayName
                                                        :
                                                        "Selected program is invalid for selected registering unit"
                                                    }
                                                </Label>
                                                <IconButton size='small' onClick={() => setorgUnitSelected({})}
                                                    style={{ marginLeft: "auto", marginTop: -5 }}>
                                                    <Close size='small' />
                                                </IconButton>
                                            </div>
                                    )
                                })}
                                <p />
                            </Box>

                        </div>
                        :
                        tEItransfered.map(x =>
                            <>
                                <div style={{ display: "flex", marginBottom: 8, marginTop: 8, width: '100%' }}>
                                    <div>

                                        <Label color="muted" style={{ marginLeft: "5px" }}>
                                            <strong>{x.name.split(";")[0].split(":")[0]} </strong>
                                            {x.name.split(";")[0].split(":")[1]}
                                            {" "}
                                            <strong>{x.name.split(";")[1].split(":")[0]} </strong>
                                            {x.name.split(";")[1].split(":")[1]}
                                        </Label >

                                    </div>
                                    <div style={{ marginLeft: "auto", width: 250, height: "auto" }}>
                                        {x.status === "Saved successfuly" ?
                                            <Check color="primary" />
                                            :
                                            <Close color="error" />
                                        }
                                    </div>

                                </div>
                                <Divider />
                            </>
                        )
                }
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary name="hide-modal"
                        onClick={() => {
                            setopen(false);
                            setTEItransfered([])
                            if (tEItransfered.length > 0) {
                                setselectRows([])
                            }
                        }}>
                        {tEItransfered.length > 0 ? "Close" : ('Cancel')}
                    </Button>
                    {tEItransfered.length === 0 && <Button
                        primary
                        name="insert-preset"
                        disabled={
                            !orgUnitSelected?.id ||
                            selectRows.length === 0 ||
                            !verifyAcess(currentDetailsProgram()?.value, orgUnitSelected.id)
                        }
                        //onClick={() => tranfer(currentDetailsProgram(), orgUnitSelected.id, selectRows)}
                        onClick={() => setOpenModalConfirmBulk(true)}
                    >
                        {('Continue')}
                    </Button>}
                </ButtonStrip>
            </ModalActions>

            {(openModalConfirmBulk && tEItransfered.length === 0) &&
                <ConfirmBulkAction
                    show={openModalConfirmBulk}
                    handleClose={handleCloseConfirmAction}
                    action={() => transferTEI(currentDetailsProgram(), orgUnitSelected.id, selectRows)}
                    loading={loading}
                    selectRows={selectRows}
                    setselectRows={setselectRows}
                    selectedTeis={selectedTeis}
                    nameOfTEIType={nameOfTEIType}
                    ouName={ouName}
                    orgUnitSelected={orgUnitSelected}
                />
            }
        </Modal >
    )
}

export default TranferEnrollment
