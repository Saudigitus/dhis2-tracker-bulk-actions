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
import ProgramSelect from '../programSelect/ProgramSelect';
import { ConfirmBulkAction } from './ConfirmBulkAction';
import DatePicker from '../datepicker/DatePicker';
import { format } from 'date-fns';
// import { OptionFields } from '../genericFields/fields/SingleSelect'

function Wrapper({ name, Component }) {
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

const TempTranferEvent = ({ open, setopen }) => {
    const { programs = [], selectRows = [], tEItransfered = [], setTEItransfered, setselectRows } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const programId = useQuery().get("programId")
    const ouName = useQuery().get("ouName")
    const [orgUnitSelected, setorgUnitSelected] = useState({})
    const [programStageSelected, setprogramStageSelected] = useState({})
    const [reportDateSelected, setreportDateSelected] = useState("")
    const { loading, transferEvent } = useTransferTEI()
    const { verifyAcess } = useVerifyOuAcess()
    const [openModalConfirmBulk, setOpenModalConfirmBulk] = useState(false)
    const handleCloseConfirmAction = () => setOpenModalConfirmBulk(false);

    function nameOfTEIType() {
        return programs.find(x => x.value === programId)?.trackedEntityType?.name || ""
    }

    function currentDetailsProgram() {
        return programs.find(x => x.value === programId)
    }

    return (
        <Modal large open={open} position={'middle'} onClose={() => setopen(false)}>
            <ModalTitle>{('Temporary transfer')}</ModalTitle>
            <p />
            <ModalContent>
                {loading && <LinearProgress />}
                {
                    tEItransfered.length === 0 ?
                        <div style={{ marginTop: 18, marginLeft: 0, marginBottom: 0 }}>
                            Temporary transfer {selectRows.length} {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected.displayName || "Organisation Unit"}`}</strong> and <strong >{` ${programStageSelected.label || "Program Stage"}`}</strong>
                            <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>
                            <Box width="100%">
                                {Wrapper({
                                    name: "Program",
                                    Component: () => (
                                        <Label>
                                            {programs.find(program => program.value === programId)?.label}
                                        </Label>
                                    )
                                })}
                                <p />
                            </Box>

                            {/*Program Stage*/}
                            <Divider />
                            <Box width="100%">
                                {Wrapper({
                                    name: "Program Stage",
                                    Component: () => (
                                        Object.keys(programStageSelected).length == 0 ?
                                            <ProgramSelect options={currentDetailsProgram().programStages} loading={loading} onChange={
                                                (e) => {
                                                    setprogramStageSelected(e)
                                                }
                                            } />
                                            :
                                            <div style={{ display: "flex" }}>
                                                <Label>
                                                    {programStageSelected.label}
                                                </Label>
                                                <IconButton size='small' onClick={() => setprogramStageSelected({})}
                                                    style={{ marginLeft: "auto", marginTop: -5 }}>
                                                    <Close size='small' />
                                                </IconButton>
                                            </div>
                                    )
                                })}
                                <p />
                            </Box>

                            {/* Organisation Unit*/}
                            <Divider />
                            <Box width="100%">
                                {Wrapper({
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

                            {/* Report Date*/}
                            <Divider />
                            <Box width="100%">
                                {Wrapper({
                                    name: "Report Date",
                                    Component: () => (
                                        !reportDateSelected ?
                                            <DatePicker
                                                onChange={(e) => setreportDateSelected(e)}
                                                value={reportDateSelected}
                                            />
                                            :
                                            <div style={{ display: "flex" }}>
                                                <Label>
                                                    {format((reportDateSelected), "yyyy-MM-dd")}
                                                </Label>
                                                <IconButton size='small' onClick={() => setreportDateSelected()}
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
                            !verifyAcess(currentDetailsProgram()?.value, orgUnitSelected.id) ||
                            !programStageSelected?.code ||
                            !reportDateSelected
                        }
                        onClick={() => setOpenModalConfirmBulk(true)}
                    >
                        {('Transfer')}
                    </Button>}
                </ButtonStrip>
            </ModalActions>
            {(openModalConfirmBulk && tEItransfered.length === 0) &&
                <ConfirmBulkAction
                    show={openModalConfirmBulk}
                    handleClose={handleCloseConfirmAction}
                    action={() => transferEvent(currentDetailsProgram(), orgUnitSelected.id, programStageSelected, format((reportDateSelected), "yyyy-MM-dd"), selectRows)}
                    loading={loading}
                    selectRows={selectRows}
                    nameOfTEIType={nameOfTEIType}
                    ouName={ouName}
                    orgUnitSelected={orgUnitSelected}
                    programStageSelected={programStageSelected}
                />}

        </Modal >
    )
}

export default TempTranferEvent
