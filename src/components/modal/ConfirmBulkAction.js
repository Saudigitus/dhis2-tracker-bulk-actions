/* eslint-disable react/prop-types */
import { Button, Checkbox, CircularLoader, Divider, Label } from '@dhis2/ui'
import { IconButton } from '@material-ui/core';
import { Check, Close, Refresh } from '@material-ui/icons';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

// eslint-disable-next-line react/prop-types

const ConfirmBulkAction = ({ show, handleClose, action, loading, selectRows, setselectRows, selectedTeis, nameOfTEIType, ouName, orgUnitSelected }) => {
    const [checked, setChecked] = useState(false);
    const [rejectedRows, setRejectedRows] = useState([]);
    const [approvedRows, setApprovedRows] = useState([...selectedTeis]);
    const onChange = (event) => {
        setChecked(event.checked)
    }

    const rejectRows =(id)=>{
        const copySelectRows = [...selectRows]
        const teiToRemove = copySelectRows.indexOf(id)
        if (teiToRemove !== -1) {
            copySelectRows.splice(teiToRemove, 1)[0];
            rejectedRows.push(id)
            setselectRows(copySelectRows)
        }
    }

    const undoRejectRows =(id)=>{
        const copySelectRows = [...selectRows]
        const teiToRemove = rejectedRows.indexOf(id)
        if (teiToRemove !== -1) {
            rejectedRows.splice(teiToRemove, 1)[0];
            copySelectRows.push(id)
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
                    Are you sure you want to transfer <strong>{selectRows.length}</strong> {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected.displayName || "Organisation Unit"}`}</strong>?
                </span>
              
                <br />
                <div style={{maxHeight: 400, overflow: 'auto', overflowX: 'hidden'}}>
                    {approvedRows?.map((x, index) =>
                        <>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 5, marginTop: 5, marginLeft: 20, width: '100%' }}>
                                <Label className={rejectedRows.includes(x.id) && 'line-through'} color="muted" style={{ marginLeft: "5px"}}>
                                    {index+1}. {x?.name?.split(";")[0].split(":")[0]} 
                                    <strong>{x?.name?.split(";")[0].split(":")[1]}</strong>
                                    {", "}
                                    {x?.name?.split(";")[1].split(":")[0]}
                                    <strong>{x?.name?.split(";")[1].split(":")[1]} </strong>
                                </Label>
                                <div style={{ marginLeft: "auto", width: 250, height: "auto" }}>
                                    {rejectedRows.includes(x.id) ? 
                                        <IconButton size='small' title='Refazer' color='primary' onClick={()=> undoRejectRows(x.id)}>
                                            <Refresh color="inherit" fontSize='small' />
                                        </IconButton>
                                        : 
                                        <IconButton size='small' title='Cancelar' onClick={()=> rejectRows(x.id)}>
                                            <Close color="inherit" fontSize='small' />
                                        </IconButton>
                                    }
                                    
                                    
                                </div>
                            </div>
                            {approvedRows.length>1 && <Divider />}
                        </>
                    )}
                </div>
                
                <span>
                    <Checkbox disabled={loading} className="checkbox-style" onChange={onChange} checked={checked} label="Agree" name="Ex" value={checked} />
                </span>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} name="Basic button" onClick={handleClose} value="default">
                    Sair
                </Button>
                <Button disabled={!checked || !selectRows.length} onClick={action} name="Primary button" destructive value="default">
                    {loading ? <CircularLoader small /> : "Tranfer"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { ConfirmBulkAction }