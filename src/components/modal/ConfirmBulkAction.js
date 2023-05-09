/* eslint-disable react/prop-types */
import { Button, Checkbox, CircularLoader, Divider, Label } from '@dhis2/ui'
import { IconButton } from '@material-ui/core';
import { Check, Close, Refresh } from '@material-ui/icons';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SingleSelectField from '../SingleSelectComponent/SingleSelectField';
import styles from './summary.module.css';


// eslint-disable-next-line react/prop-types

const ConfirmBulkAction = ({
    modalType, show,
    handleClose, action,
    loading, selectRows,
    setselectRows, selectedTeis,
    nameOfTEIType, ouName,
    orgUnitSelected, label,
    initStatus, endStatus,
    teiEnrollment, localTeiEnrollment,
    setlocalTeiEnrollment, program, selectedProgram
}) => {
    const [checked, setChecked] = useState(false);
    const [rejectedRows, setRejectedRows] = useState([]);
    const [approvedRows, setApprovedRows] = useState([...selectedTeis]);
    const onChange = (event) => {
        setChecked(event.checked)
    }

    const rejectRows = (obj) => {
const copySelectRows = [...selectRows]
        const teiToRemove = copySelectRows.findIndex(x=>x.id===obj.id)
        if (teiToRemove !== -1) {
            copySelectRows.splice(teiToRemove, 1)[0];
            rejectedRows.push(obj)
            setselectRows(copySelectRows)
        }
    }

    const undoRejectRows = (obj) => {
        const copySelectRows = [...selectRows]
        const teiToRemove = rejectedRows.findIndex(x=>x.id===obj.id)
        if (teiToRemove !== -1) {
            rejectedRows.splice(teiToRemove, 1)[0];
            copySelectRows.push(obj)
            setselectRows(copySelectRows)
        }
    }
    
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>

                <h3 className='py-3 text-center'>Atention</h3>
                <span className=''>
                    {modalType === "transfer" && <span> Are you sure you want to <strong className='text-danger'>permanently transfer </strong> <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected?.displayName || "Organisation Unit"}`}</strong>?</span>}
                    {modalType === "TEMPtransfer" && <span> Are you sure you want to <strong className='text-danger'>temporarily transfer</strong> <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected?.displayName || "Organisation Unit"}`}</strong>?</span>}
                    {modalType === "delete" && <span> Are you sure you want to <strong className='text-danger'>delete</strong>  <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${ouName} `}</strong>?</span>}
                    {modalType === "ChangeStatus" && <span> Are you sure you want to <strong className='text-danger'>change status </strong>from <strong >{` ${initStatus}`}</strong> to <strong >{`${endStatus}`}</strong>?</span>}
                    {modalType === "diffProgram" && <span> Are you sure you want to <strong className='text-danger'>enroll</strong> <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${program()?.label} `}</strong> to<strong >{` ${selectedProgram || "Program"}`}</strong>?</span>}
                </span>
                <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>

                <br />
                <div style={{ maxHeight: 400, overflow: 'auto', overflowX: 'hidden' }}>
                    {approvedRows?.map((x, index) =>
                        <>
                            <div style={{ display: "flex", alignItems: "center",  marginBottom: 5, marginTop: 5, marginLeft: 20, width: '100%' }}>
                                <>
                                    <Label className={rejectedRows.some(e => e.id === x.id) && styles.lineThrough} color="muted" style={{ marginLeft: "5px" }}>
                                        {index + 1}. {x?.name?.split(";")[0].split(":")[0]}
                                        <strong>{x?.name?.split(";")[0].split(":")[1]}</strong>
                                        {", "}
                                        {x?.name?.split(";")[1].split(":")[0]}
                                        <strong>{x?.name?.split(";")[1].split(":")[1]} </strong>
                                    </Label>
                                    {modalType === "ChangeStatus" && <div style={{ width: 250 }}>
                                        <SingleSelectField disabled={rejectedRows.some(e => e.id === x.id)} helperText={"EnrollmentDate"} value={localTeiEnrollment[x.id]} options={teiEnrollment[x.id]?.enrollments} loading={false}
                                            onChange={
                                                (v, e) => {
                                                    setlocalTeiEnrollment({ ...localTeiEnrollment, [x.id]: e.value })
                                                }
                                            }
                                        />
                                    </div>}
                                </>
                                <div style={{ marginLeft: "auto", width: 90, height: "auto" }}>
                                    {rejectedRows.some(e => e.id === x.id) ?
                                        <IconButton size='small' title='Refazer' color='primary' onClick={() => undoRejectRows(x)}>
                                            <Refresh color="inherit" fontSize='small' />
                                        </IconButton>
                                        :
                                        <IconButton size='small' title='Cancelar' onClick={() => rejectRows(x)}>
                                            <Close color="inherit" fontSize='small' />
                                        </IconButton>
                                    }
                                </div>
                            </div>
                            {approvedRows.length > 1 && <Divider />}
                        </>
                    )}
                </div>

                <span>
                    <Checkbox disabled={loading} className="checkbox-style" onChange={onChange} checked={checked} label="Agree" name="Ex" value={checked} />
                </span>

            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} name="Basic button" onClick={handleClose} value="default">
                    Cancel
                </Button>
                <Button disabled={!checked || !selectRows?.length || modalType === "ChangeStatus" && (Object.keys(localTeiEnrollment)?.length != selectRows?.length)}
                    onClick={action} name="Primary button" destructive value="default">
                    {loading ? <CircularLoader small /> : label}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { ConfirmBulkAction }