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
import { Collapse, Divider, IconButton, LinearProgress } from '@material-ui/core'
import { Check, Close, InfoOutlined } from '@material-ui/icons';
import React, { useState, useContext } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useTransferTEI } from '../../hooks/bulkoperations/useTransfer';
import { useParams } from '../../hooks/common/useQueryParams';
import { useVerifyOuAcess } from '../../hooks/programs/useVerifyOuAcess';
import { OrgUnitCard } from '../OrgUnitTree';
import SingleSelectField from '../SingleSelectComponent/SingleSelectField';
import { ConfirmBulkAction } from './ConfirmBulkAction';
import { useChangeStatus } from '../../hooks/bulkoperations/useChangeStatus';
import styles from './summary.module.css';
import { GenericSummary } from './GenericSummary';
import { get2AttributeTei } from '../../utils/commons/get2AttributeTei';
// import { OptionFields } from '../genericFields/fields/SingleSelect'

// eslint-disable-next-line react/prop-types
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

// eslint-disable-next-line react/prop-types
const ChangeStatusEnrollment = ({ open, setopen, modalType, initStatus, teiEnrollment, selectedIndex, handleErrorClick, showSummaryModal, handleCloseSummary }) => {
    const { programs = [], selectRows = [], tEItransfered = [], setTEItransfered, setselectRows, allTeisFormated } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const programId = useQuery().get("programId")
    const ouName = useQuery().get("ouName")
    const [statusSelected, setstatusSelected] = useState("")
    const { loading, changeProgramStatus } = useChangeStatus()
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
            const teiData = get2AttributeTei(tei, currentDetailsProgram())
            teisSelected.push({ id: tei.id, name: teiData, isSelected: true })
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
        <Modal large open={open} position={'middle'} onClose={() => { setopen(false); setTEItransfered([]) }}>
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
                                            <SingleSelectField helperText={"Select Status"} value={statusSelected} options={status} loading={loading} onChange={
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
                        <GenericSummary loading={loading} modalType={modalType} show={showSummaryModal} handleClose={() => { handleCloseSummary(); handleCloseConfirmAction(); setopen(false) }} tEItransfered={tEItransfered} selectedIndex={selectedIndex} handleErrorClick={handleErrorClick} />
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

            console.log(tEItransfered);

            {(openModalConfirmBulk && tEItransfered.length === 0) &&
                <ConfirmBulkAction
                    show={openModalConfirmBulk}
                    handleClose={handleCloseConfirmAction}
                    action={() => changeProgramStatus(currentDetailsProgram(), statusSelected, selectRows, initStatus)}
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
                />
            }
        </Modal >
    )
}

export default ChangeStatusEnrollment
