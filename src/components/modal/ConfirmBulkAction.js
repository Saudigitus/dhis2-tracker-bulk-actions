/* eslint-disable react/prop-types */
import { Button, Checkbox, CircularLoader, Divider, Label } from '@dhis2/ui'
import { IconButton } from '@material-ui/core';
import { Check, Close, Refresh, Replay, Undo, UndoOutlined, UndoRounded } from '@material-ui/icons';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SingleSelectField from '../SingleSelectComponent/SingleSelectField';
import styles from './summary.module.css';
import Confirm from './Confirm';


// eslint-disable-next-line react/prop-types

const ConfirmBulkAction = ({
    modalType, show,
    handleClose, action,
    loading, selectRows,
    setselectRows, selectedTeis,
    nameOfTEIType, ouName,
    orgUnitSelected, label,
    initStatus, endStatus,
    program, selectedProgram
}) => {
    const [checked, setChecked] = useState(false);
    const [rejectedRows, setRejectedRows] = useState([]);
    const [approvedRows, setApprovedRows] = useState([...selectedTeis]);
    const [openConfirmModal, setopenConfirmModal] = useState(false);
    const handleCloseConfirm = () => setopenConfirmModal(false);

    const onChange = (event) => {
        setChecked(event.checked)
    }

    const rejectRows = (obj) => {
        const copySelectRows = [...selectRows]
        const teiToRemove = copySelectRows.findIndex(x => x.id === obj.id)
        if (teiToRemove !== -1) {
            copySelectRows.splice(teiToRemove, 1)[0];
            rejectedRows.push(obj)
            setselectRows(copySelectRows)
        }
    }

    const undoRejectRows = (obj) => {
        const copySelectRows = [...selectRows]
        const teiToRemove = rejectedRows.findIndex(x => x.id === obj.id)
        if (teiToRemove !== -1) {
            rejectedRows.splice(teiToRemove, 1)[0];
            copySelectRows.push(obj)
            setselectRows(copySelectRows)
        }
    }

    function message() {
        return (
            <>
                {modalType === "transfer" && <span> Are you sure you want to <strong className='text-danger'>permanently transfer </strong> <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected?.displayName || "Organisation Unit"}`}</strong>?</span>}
                {modalType === "TEMPtransfer" && <span> Are you sure you want to <strong className='text-danger'>temporarily transfer</strong> <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected?.displayName || "Organisation Unit"}`}</strong>?</span>}
                {modalType === "delete" && <span> Are you sure you want to <strong className='text-danger'>delete</strong>  <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${ouName} `}</strong>?</span>}
                {modalType === "changeStatus" && <span> Are you sure you want to <strong className='text-danger'>change status </strong>from <strong >{` ${initStatus}`}</strong> to <strong >{`${endStatus}`}</strong>?</span>}
                {modalType === "diffProgram" && <span> Are you sure you want to <strong className='text-danger'>enroll</strong> <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${program()?.label} `}</strong> to<strong >{` ${selectedProgram || "Program"}`}</strong>?</span>}
            </>
        )
    }

    function title() {
        return (
            <>
                {modalType === "transfer" && <span>Permanent Tranfer</span>}
                {modalType === "TEMPtransfer" && <span>Temporary Transfer</span>}
                {modalType === "delete" && <span>Delete Entity</span>}
                {modalType === "changeStatus" && <span>Change Enrollment Status</span>}
                {modalType === "diffProgram" && <span>Enroll in Different Program</span>}
            </>
        )
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                {action ?
                    <h3 className='py-3 text-center'>Atention</h3>
                    :
                    <h3 className='py-3 text-center'>{selectRows.length} {nameOfTEIType()} selected</h3>
                }
                <span className=''>
                    {message()}
                </span>
                <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>

                <br />
                <div style={{ maxHeight: 400, overflow: 'auto', overflowX: 'hidden' }}>
                    {approvedRows?.map((x, index) =>
                        <>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5, marginTop: 5, marginLeft: 20, width: '100%' }}>
                                <Label className={rejectedRows.some(e => e.id === x.id) && styles.lineThrough} color="muted" style={{ marginLeft: "5px" }}>
                                    {index + 1}. {x?.name?.split(";")[0].split(":")[0]}
                                    <strong>{x?.name?.split(";")[0].split(":")[1]}</strong>
                                    {", "}
                                    {x?.name?.split(";")[1].split(":")[0]}
                                    <strong>{x?.name?.split(";")[1].split(":")[1]} </strong>
                                </Label>
                                <div style={{ marginLeft: "auto", width: 90, height: "auto" }}>
                                    {rejectedRows.some(e => e.id === x.id) ?
                                        <IconButton size='small' title='Refazer' color='primary' onClick={() => undoRejectRows(x)}>
                                            <Replay color="inherit" fontSize='small' />
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

                {action &&
                    <span>
                        <Checkbox disabled={loading} className="checkbox-style" onChange={onChange} checked={checked} label="Agree" name="Ex" value={checked} />
                    </span>
                }
                {openConfirmModal &&
                    <Confirm
                        open={openConfirmModal}
                        action={action}
                        handleClose={handleCloseConfirm}
                        message={message()}
                        title={title()}
                    />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} name="Basic button" onClick={handleClose} value="default">
                    {action ? 'Cancel' : 'Close'}
                </Button>
                {action &&
                    <Button disabled={!checked || !selectRows?.length}
                        // onClick={action}
                        onClick={() => setopenConfirmModal(true)}
                        name="Primary button" destructive value="default">
                        {loading ? <CircularLoader small /> : label}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export { ConfirmBulkAction }