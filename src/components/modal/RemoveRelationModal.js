/* eslint-disable react/prop-types */
import { Button, Checkbox, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { attributeFilter } from '../../utils/commons/filterAttributes';
import { useDataMutation } from '@dhis2/app-runtime';

// eslint-disable-next-line react/prop-types

const relationShipsDeleteQuery = {
    resource: "relationships",
    type: "delete",
    id: ({ id }) => id,
}

const RemoveRelationModal = ({ show, handleClose, selectedRelationShip, refetchRelationShip, setRefetchRelationShips }) => {
    const [checked, setChecked] = useState(false);

    const onChange = (event) => {
        setChecked(event.checked)
    }

    const [mutate, { loading, error }] = useDataMutation(relationShipsDeleteQuery, {
        variables: {
            id: selectedRelationShip.relationship,
        },
        onComplete: () => {
            setRefetchRelationShips(!refetchRelationShip)
            handleClose()
        }
    })

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h2>Atenção</h2>
                <span>
                    Pretende mesmo remover <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>{attributeFilter(selectedRelationShip.from.trackedEntityInstance.attributes, "Redsyjfv004")} {attributeFilter(selectedRelationShip.from.trackedEntityInstance.attributes, "Redsyjfv005")}</span> deste processo?
                    Se remover este utente, não fará mais parte do proccesso e todos dados deste utente relacionados com este processo
                    serão perdidos.
                </span>

                <br />
                <br />
                <span>
                    <Checkbox className="checkbox-style" onChange={onChange} checked={checked} label="Concordo" name="Ex" value={checked} />
                </span>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} name="Basic button" onClick={handleClose} value="default">
                    Sair
                </Button>
                <Button disabled={!checked} onClick={mutate} name="Primary button" destructive value="default">
                    {loading ? <CircularLoader small /> : "Remover"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { RemoveRelationModal }