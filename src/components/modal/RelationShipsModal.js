/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { useDataEngine, useDataMutation } from '@dhis2/app-runtime';
import { ReactFinalForm, Button, Input } from '@dhis2/ui'
import { CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useHeader } from '../../hooks/tableHeader/useHeader';
import { formatResponseData } from '../../utils/table/rows/formatResponseData';
import { GenericFields } from '../genericFields'
import { DataTable } from '../table/DataTable';

const fetchSearchedTei = {
    tei: {
        resource: "trackedEntityInstances",
        params: ({ attributes, program, ou }) => ({
            ou: ou,
            ouMode: "ACCESSIBLE",
            program: program,
            fields: "*",
            attribute: attributes
        })
    }
}

const postRelationShips = {
    resource: "relationships",
    type: "create",
    data: ({ data }) => data
}

// eslint-disable-next-line react/prop-types
const RelationShipsModal = ({ show, handleClose, teiData, ou, refetchRelationShip, setRefetchRelationShips}) => {
    const engine = useDataEngine();
    const [queryForm, setQueryForm] = useState({})
    const [loadTei, setLoadTei] = useState(null);
    const [teiColumns, setTeiColumns] = useState();
    const [rowData, setRowData] = useState({})
    const [mutate,{loading:relationPosting}] = useDataMutation(postRelationShips,{
        onComplete:() => {
            setRefetchRelationShips(!refetchRelationShip)
            handleClose()
        }
    });


    const program = teiData.searchableFields[0].program.id;
    const type = "WITH_REGISTRATION"

    const { headers = [], loading, } = useHeader({ type, program })

    const onHandleChange = ({ target: { value, name } }) => {
        setQueryForm({
            ...queryForm,
            [name]: value,
        });
    }


    const onHandleSubmit = async () => {
        var query = ""
        for (const [key, value] of Object.entries(queryForm)) {
            const id = teiData.searchableFields.filter(element => {
                return element.name == key
            })[0].trackedEntityAttribute.id;

            if (id) {
                query += `${id}:LIKE:${value},`
            }
        }

        setLoadTei(true);
        await engine.query(fetchSearchedTei, {
            variables: { program: teiData.searchableFields[0].program.id, attributes: query.slice(0, -1), ou: ou },
            onComplete: async response => {
                const colums = formatResponseData(type, response.tei.trackedEntityInstances || [])
                setTeiColumns(colums)
                setLoadTei(false)
            }
        })
    }

    const onPostRelationships = async () => {
        const data = {
            "from": { "trackedEntityInstance": { "trackedEntityInstance":rowData.id } }, "to": { "trackedEntityInstance": { "trackedEntityInstance":teiData.tei } }, "relationshipType": teiData.relationshipType
        }

        await mutate({data:data});
    }

    return (
        <ReactFinalForm.Form onSubmit={onHandleSubmit}>
            {({ handleSubmit, reset, values, submitting, pristine, form }) => (
                <form onSubmit={(event) => handleSubmit(event)} onChange={event => onHandleChange(event)}>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        size='xl'
                        keyboard={false}
                        centered
                        contentClassName="custom-modal-content"
                    >
                        <Modal.Header>
                            <Modal.Title className='text-muted'>Add relationships</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='relation_modal-body'>
                            <Row className='w-100 h-100'>
                                <Col xs={3} className="relationships_left-card border">

                                </Col>
                                <Col xs={9} className="relationships_rigth-card">
                                    <Input className="mb-3" label="An input" disabled name="input" value={teiData?.relationName} />
                                    <Row>
                                        {
                                            teiData.searchableFields?.map((campo, index) => (
                                                <Col key={index} sm={6} className="mb-2">
                                                    <span className='text-muted'>{campo.name}</span>
                                                    <GenericFields
                                                        attribute={campo}
                                                        value={queryForm[campo.name]}
                                                    />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                    <Button disabled={Object.keys(queryForm).length === 0} type="submit" onClick={onHandleSubmit} className="my-4" name="Basic button" value="default">
                                        <SearchIcon />
                                    </Button>
                                    {
                                        loadTei !== null &&
                                        <DataTable
                                            setRowData={setRowData}
                                            rowData={rowData}
                                            columnData={teiColumns}
                                            headers={headers}
                                            loading={loadTei}
                                            loadingHeader={loading}
                                        />
                                    }
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button name="Basic button" onClick={handleClose} value="default">
                                Sair
                            </Button>
                            <Button onClick={()=>onPostRelationships()} disabled={Object.keys(rowData).length === 0 || relationPosting===true} name="Primary button" type="submit" primary value="default">
                                {relationPosting===false?"Concluir":<CircularProgress size={20}/>}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            )}
        </ReactFinalForm.Form>
    )
}

export { RelationShipsModal }