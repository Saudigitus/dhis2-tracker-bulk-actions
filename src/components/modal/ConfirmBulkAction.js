/* eslint-disable react/prop-types */
import { Button, Checkbox, CircularLoader, Label } from '@dhis2/ui'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

// eslint-disable-next-line react/prop-types

const ConfirmBulkAction = ({ show, handleClose, action, loading, selectRows, selectedTeis, nameOfTEIType, ouName, orgUnitSelected }) => {
    const [checked, setChecked] = useState(false);
    const onChange = (event) => {
        setChecked(event.checked)
    }
    
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h2 className='py-3'>Atention</h2>
                <span className='delete__relationships-aler'>
                    Are you sure you want to transfer {selectRows.length} {nameOfTEIType()} from<strong >{` ${ouName} `}</strong> to<strong >{` ${orgUnitSelected.displayName || "Organisation Unit"}`}</strong>?
                </span>
                <br />
                {
                    selectedTeis?.map((x, index) =>
                        <>
                            <div style={{ display: "flex", marginBottom: 8, marginTop: 8, marginLeft: 20, width: '100%' }}>
                                    <Label color="muted" style={{ marginLeft: "5px" }}>
                                        {index+1}. {x.name.split(";")[0].split(":")[0]} 
                                        <strong>{x.name.split(";")[0].split(":")[1]}</strong>
                                        {", "}
                                        {x.name.split(";")[1].split(":")[0]}
                                        <strong>{x.name.split(";")[1].split(":")[1]} </strong>
                                    </Label >
                            </div>
                        </>
                    )
                }
                <span>
                    <Checkbox disabled={loading} className="checkbox-style" onChange={onChange} checked={checked} label="Agree" name="Ex" value={checked} />
                </span>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} name="Basic button" onClick={handleClose} value="default">
                    Sair
                </Button>
                <Button disabled={!checked} onClick={action} name="Primary button" destructive value="default">
                    {loading ? <CircularLoader small /> : "Tranfer"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { ConfirmBulkAction }