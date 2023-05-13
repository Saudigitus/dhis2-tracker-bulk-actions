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
import { useParams } from '../../hooks/common/useQueryParams';
import { useVerifyOuAcess } from '../../hooks/programs/useVerifyOuAcess';
import { useTransferTEI } from '../../hooks/bulkoperations/useTransfer';
import { OrgUnitCard } from '../OrgUnitTree';
import { ConfirmBulkAction } from './ConfirmBulkAction';
import styles from './summary.module.css';
import { GenericSummary } from './GenericSummary';

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

const TranferEnrollment = ({ open, setopen, selectedTeis, modalType, nameOfTEIType, currentDetailsProgram, selectedIndex, handleErrorClick, showSummaryModal, handleCloseSummary }) => {
    const { programs = [], selectRows = [], tEItransfered = [], setTEItransfered, setselectRows } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const programId = useQuery().get("programId")
    const ouName = useQuery().get("ouName")
    const [orgUnitSelected, setorgUnitSelected] = useState({})
    const { loading, transferTEI } = useTransferTEI()
    const { verifyAcess } = useVerifyOuAcess()
    const [openModalConfirmBulk, setOpenModalConfirmBulk] = useState(false)
    const handleCloseConfirmAction = () => setOpenModalConfirmBulk(false);

    return (
        <Modal large open={open} position={'middle'} onClose={() => {setopen(false); setTEItransfered([])}}>
            <ModalTitle>{('Permanent transfer')}</ModalTitle>
            <ModalContent>
                {loading && <LinearProgress />}
                {
                    tEItransfered.length === 0 ?
                        <div style={{ marginTop: 18, marginLeft: 0, marginBottom: 0 }}>
                            Permanently transfer <strong>{selectRows.length}</strong>  {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected.displayName || "Organisation Unit"}`}</strong>
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
                                            <OrgUnitCard modal={true}
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
                        <GenericSummary loading={loading} modalType={modalType} show={showSummaryModal} handleClose={()=>{handleCloseSummary(); handleCloseConfirmAction(); setopen(false)}} tEItransfered={tEItransfered} selectedIndex={selectedIndex} handleErrorClick={handleErrorClick}/>
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
                        onClick={() => setOpenModalConfirmBulk(true)}
                    >
                        {('Continue')}
                    </Button>}
                </ButtonStrip>
            </ModalActions>
            {(openModalConfirmBulk && tEItransfered.length === 0) && <ConfirmBulkAction modalType={modalType} show={openModalConfirmBulk} handleClose={handleCloseConfirmAction} action={() => transferTEI(currentDetailsProgram(), orgUnitSelected.id, selectRows)} loading={loading} selectRows={selectRows} setselectRows={setselectRows} selectedTeis={selectedTeis} nameOfTEIType={nameOfTEIType} ouName={ouName} orgUnitSelected={orgUnitSelected} label={"Transfer"} />}

        </Modal >
    )
}

export default TranferEnrollment
