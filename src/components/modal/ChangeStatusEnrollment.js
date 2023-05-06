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
import { useTransferTEI } from '../../hooks/bulkoperations/useTransfer';
import { useParams } from '../../hooks/common/useQueryParams';
import { useVerifyOuAcess } from '../../hooks/programs/useVerifyOuAcess';
import { OrgUnitCard } from '../OrgUnitTree';
import SingleSelectField from '../SingleSelectComponent/SingleSelectField';
import { ConfirmBulkAction } from './ConfirmBulkAction';
import { useChangeStatus } from '../../hooks/bulkoperations/useChangeStatus';
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

const ChangeStatusEnrollment = ({ open, setopen, modalType, initStatus, teiEnrollment }) => {
    const { programs = [], selectRows = [], tEItransfered = [], setTEItransfered, setselectRows, allTeisFormated } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const programId = useQuery().get("programId")
    const ouName = useQuery().get("ouName")
    const [statusSelected, setstatusSelected] = useState("")
    const { loading, changeProgramStatus } = useChangeStatus()
    const { verifyAcess } = useVerifyOuAcess()
    const [openModalConfirmBulk, setOpenModalConfirmBulk] = useState(false)
    const handleCloseConfirmAction = () => setOpenModalConfirmBulk(false);
    const [localTeiEnrollment, setlocalTeiEnrollment] = useState({})

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


    const status = [{
        label: "ACTIVE",
        value: "ACTIVE"
    },
    {
        label: "COMPLETED",
        value: "COMPLETED"
    },
    {
        label: "CANCELLED",
        value: "CANCELLED"
    }]

    return (
        <Modal large open={open} position={'middle'} onClose={() => setopen(false)}>
            <ModalTitle>{('Change Status')}</ModalTitle>
            <p />
            <ModalContent>
                {loading && <LinearProgress />}
                {
                    tEItransfered.length === 0 ?
                        <div style={{ marginTop: 18, marginLeft: 0, marginBottom: 0 }}>
                            Change status of <strong>{selectRows.length}</strong>  {nameOfTEIType()} to<strong >{` ${statusSelected || "Status"}`}</strong>
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
                                    name: "Program Status",
                                    Component: () => (
                                        !statusSelected ?
                                            <SingleSelectField helperText={"Select Status"} value={statusSelected} options={status.filter(x => x.value != initStatus)} loading={loading} onChange={
                                                (v, e) => {
                                                    setstatusSelected(e.value)
                                                }
                                            } />
                                            :
                                            <div style={{ display: "flex" }}>
                                                <Label>
                                                    {statusSelected}
                                                </Label>
                                                <IconButton size='small' onClick={() => setstatusSelected({})}
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
                            !statusSelected ||
                            selectRows.length === 0
                        }
                        //onClick={() => tranfer(currentDetailsProgram(), statusSelected, selectRows)}
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
                    action={() => changeProgramStatus(currentDetailsProgram(), statusSelected, selectRows, localTeiEnrollment)}
                    loading={loading}
                    selectRows={selectRows}
                    setselectRows={setselectRows}
                    selectedTeis={selectedTeis}
                    nameOfTEIType={nameOfTEIType}
                    ouName={statusSelected}
                    orgUnitSelected={{}}
                    label={"Change Status"}
                    modalType={modalType}
                    initStatus={initStatus}
                    endStatus={statusSelected}
                    teiEnrollment={teiEnrollment}
                    localTeiEnrollment={localTeiEnrollment}
                    setlocalTeiEnrollment={setlocalTeiEnrollment}
                />
            }
        </Modal >
    )
}

export default ChangeStatusEnrollment
