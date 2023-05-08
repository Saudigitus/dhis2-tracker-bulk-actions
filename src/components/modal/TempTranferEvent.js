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
import SingleSelectField from '../SingleSelectComponent/SingleSelectField';
import { ConfirmBulkAction } from './ConfirmBulkAction';
import DatePicker from '../datepicker/DatePicker';
import { format } from 'date-fns';
import styles from './summary.module.css';
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

// eslint-disable-next-line react/prop-types
const TempTranferEvent = ({ open, setopen, modalType, selectedIndex, handleErrorClick }) => {
    const { programs = [], selectRows = [], tEItransfered = [], setTEItransfered, setselectRows, allTeisFormated } = useContext(GeneratedVaribles)
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

    function getTeiDetails() {
        const teisSelected = []
        for (const tei of selectRows) {
            const teiData = `${currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${tei?.[currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id]};${currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${tei?.[currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id]}`
            teisSelected.push({ id: tei.id, name: teiData, isSelected: true })

        }
        return teisSelected
    }

    const selectedTeis = getTeiDetails(currentDetailsProgram())

    return (
        <Modal large open={open} position={'middle'} onClose={() => {setopen(false); setTEItransfered([])}}>
            <ModalTitle>{('Temporary transfer')}</ModalTitle>
            <p />
            <ModalContent>
            <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>
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
                                            <SingleSelectField helperText={"Select ProgramStage"} value={programStageSelected} options={currentDetailsProgram().programStages} loading={loading} onChange={
                                                (v, e) => {
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
                        tEItransfered.map((x, index) =>
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
                                    <div style={{ marginLeft: "auto", width: 100, height: "auto" }}>
                                        {x.status === "Saved successfuly" ?
                                            <span className={styles.successStatus}>Success</span>
                                            :
                                            <div className='d-flex align-items-center'>
                                                <span className={styles.errorStatus}>Error</span> 
                                                <IconButton onClick={() => handleErrorClick(index)} style={{color: "#C21A3D", marginBottom: 10}} size='small' title='More details'>
                                                    <InfoOutlined fontSize='small' />
                                                </IconButton>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <Collapse in={selectedIndex === index}> <div className={styles.errorMessage}>{x?.error?.message}</div> </Collapse>
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
                        {('Continue')}
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
                    setselectRows={setselectRows}
                    selectedTeis={selectedTeis}
                    nameOfTEIType={nameOfTEIType}
                    ouName={ouName}
                    orgUnitSelected={orgUnitSelected}
                    programStageSelected={programStageSelected}
                    label={"Transfer"}
                    modalType={modalType}
          />
            }

        </Modal >
    )
}

export default TempTranferEvent
