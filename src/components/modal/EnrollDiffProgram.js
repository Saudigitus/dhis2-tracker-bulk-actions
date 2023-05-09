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
import { format } from 'date-fns';
import React, { useState, useContext } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useCreateEnrollment } from '../../hooks/bulkoperations/useCreateEnrollment';
import { useParams } from '../../hooks/common/useQueryParams';
import { useVerifyOuAcess } from '../../hooks/programs/useVerifyOuAcess';
import DatePicker from '../datepicker/DatePicker';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { OrgUnitCard } from '../OrgUnitTree';
import SingleSelectField from '../SingleSelectComponent/SingleSelectField';
import { ConfirmBulkAction } from './ConfirmBulkAction';
import styles from './summary.module.css';
// import { OptionFields } from '../genericFields/fields/SingleSelect'

// eslint-disable-next-line react/prop-types
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
const EnrollDiffProgram = ({ open, setopen, selectedTeis, modalType, nameOfTEIType, currentDetailsProgram, selectedIndex, handleErrorClick }) => {
    const { programs = [], selectRows = [], tEItransfered = [], setTEItransfered, setselectRows } = useContext(GeneratedVaribles)
    const { useQuery } = useParams()
    const ouName = useQuery().get("ouName")
    const [orgUnitSelected, setorgUnitSelected] = useState({})
    const [programSelected, setprogramSelected] = useState({})
    const [enrollmentDate, setenrollmentDate] = useState("")
    const [incidentDate, setincidentDate] = useState("")
    const { loading, createEnrollment } = useCreateEnrollment()
    const { verifyAcess } = useVerifyOuAcess()
    const [openModalConfirmBulk, setOpenModalConfirmBulk] = useState(false)
    const handleCloseConfirmAction = () => setOpenModalConfirmBulk(false);

    console.log(currentDetailsProgram(), programSelected, "currentDetailsProgram");

    return (
        <Modal large open={open} position={'middle'} onClose={() => setopen(false)}>
            <ModalTitle>{('Enroll in Different Program')}</ModalTitle>
            <ModalContent>
                <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>
                {loading && <LinearProgress />}
                {
                    tEItransfered.length === 0 ?
                        <div style={{ marginTop: 18, marginLeft: 0, marginBottom: 0 }}>
                            Enroll <strong>{selectRows.length}</strong>  {nameOfTEIType()} from<strong >{` ${currentDetailsProgram()?.label} `}</strong> to<strong >{` ${programSelected?.label || "Program"}`}</strong>
                            <Box width="100%">
                                {Wrapper({
                                    name: "Program",
                                    Component: () => (
                                        Object.keys(programSelected).length == 0 ?
                                            <SingleSelectField helperText={"Select Status"} value={programSelected} options={programs.filter(x => x.trackedEntityType.id === currentDetailsProgram()?.trackedEntityType.id)} onChange={
                                                (v, e) => {
                                                    setprogramSelected(e)
                                                }
                                            } />
                                            :
                                            <div style={{ display: "flex" }}>
                                                <Label>
                                                    {programSelected?.label}
                                                </Label>
                                                <IconButton size='small' onClick={() => setprogramSelected({})}
                                                    style={{ marginLeft: "auto", marginTop: -5 }}>
                                                    <Close size='small' />
                                                </IconButton>
                                            </div>
                                    )
                                })}
                                <p />
                                {
                                    currentDetailsProgram().value === programSelected.value &&
                                    <div className='enroll__same-program'>
                                        <ErrorOutlineIcon />
                                        <span>You are about to enroll to the same program. The active enrollment will be completed and a new enrollment will be created.</span>
                                    </div>
                                }
                            </Box>
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

                            {/* Enrollment Date*/}
                            <Divider />
                            <Box width="100%">
                                {Wrapper({
                                    name: "Enrollment Date",
                                    Component: () => (
                                        !enrollmentDate ?
                                            <DatePicker
                                                onChange={(e) => setenrollmentDate(e)}
                                                value={enrollmentDate}
                                            />
                                            :
                                            <div style={{ display: "flex" }}>
                                                <Label>
                                                    {format((enrollmentDate), "yyyy-MM-dd")}
                                                </Label>
                                                <IconButton size='small' onClick={() => setenrollmentDate()}
                                                    style={{ marginLeft: "auto", marginTop: -5 }}>
                                                    <Close size='small' />
                                                </IconButton>
                                            </div>
                                    )
                                })}
                                <p />
                            </Box>


                            {/* Incident Date*/}
                            <Divider />
                            <Box width="100%">
                                {Wrapper({
                                    name: "Incident Date",
                                    Component: () => (
                                        !incidentDate ?
                                            <DatePicker
                                                onChange={(e) => setincidentDate(e)}
                                                value={incidentDate}
                                            />
                                            :
                                            <div style={{ display: "flex" }}>
                                                <Label>
                                                    {format((incidentDate), "yyyy-MM-dd")}
                                                </Label>
                                                <IconButton size='small' onClick={() => setincidentDate()}
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
                                        {x.status === "SUCCESS" ?
                                            <span className={styles.successStatus}>Success</span>
                                            :
                                            <div className='d-flex align-items-center'>
                                                <span className={styles.errorStatus}>Error</span>
                                                <IconButton onClick={() => handleErrorClick(index)} style={{ color: "#C21A3D", marginBottom: 10 }} size='small' title='More details'>
                                                    <InfoOutlined fontSize='small' />
                                                </IconButton>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <Collapse in={selectedIndex === index}> <div className={styles.errorMessage}>{x?.error}</div> </Collapse>
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
                            !enrollmentDate ||
                            !incidentDate ||
                            !programSelected?.value
                        }
                        onClick={() => setOpenModalConfirmBulk(true)}
                    >
                        {('Continue')}
                    </Button>}
                </ButtonStrip>
            </ModalActions>
            {(openModalConfirmBulk && tEItransfered.length === 0) &&
                <ConfirmBulkAction modalType={modalType}
                    show={openModalConfirmBulk}
                    handleClose={handleCloseConfirmAction}
                    action={() => createEnrollment(programSelected, orgUnitSelected.id, selectRows, enrollmentDate, incidentDate)}
                    loading={loading} selectRows={selectRows}
                    setselectRows={setselectRows}
                    selectedTeis={selectedTeis}
                    nameOfTEIType={nameOfTEIType}
                    ouName={ouName} orgUnitSelected={orgUnitSelected}
                    label={"Enroll"}
                    program={currentDetailsProgram}
                    selectedProgram={programSelected?.label}
                />
            }

        </Modal >
    )
}

export default EnrollDiffProgram
