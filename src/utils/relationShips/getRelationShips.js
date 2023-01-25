/* eslint-disable import/extensions */
/* eslint-disable max-params */
import { Button } from '@dhis2/ui';
import React from 'react';
import { CardProccessMng, CardProcessos } from '../../components';
import { attributeFilter } from '../commons/filterAttributes';
import { getAge } from '../commons/getAge';
import { getGender } from '../commons/getGender';
import { getRelativeTime } from '../commons/toRelativeTime';


const relationShipsQuery = {
    relationShips: {
        resource: "relationships",
        params: ({ tei }) => ({
            tei: tei
        })
    }
}

const getSearchableAttributes = {
    attributes: {
        resource: "programs",
        id: ({ id }) => id,
        params: {
            fields: "programTrackedEntityAttributes[*]"
        }
    }
}


const relationShipsStatus = {
    status: {
        resource: "trackedEntityInstances",
        id: ({ id }) => id,
        params: {
            fields: "enrollments[status]"
        }
    }
}

const relationShipCount = {
    menor: 0,
    requerentes: 0
}

const fetchRelationShips = async (setLoadRelationships,engine,
    teiId,trackedEntitytype,setRelationStatusLoad,object, setSelectRelationShip,
    handleShow,setTeiData,programId,handleShowRemoval,setRelationships,setRelationComponents) => {
    setLoadRelationships(true)
    await BDbg3oehQRj.query(relationShipsQuery, {
        variables: { tei: teiId },
        onComplete: async (response) => {

            const requerenteAttributes = await engine.query(getSearchableAttributes, {
                variables: { id: "HiCAPKV7wcF" }
            })

            const menorAttributes = await engine.query
                (getSearchableAttributes, {
                    variables: { id: "S9gb3TiYo6l" }
                })

            const attributesMenor = menorAttributes.attributes.programTrackedEntityAttributes.filter(element => {
                return element.searchable === true
            })

            const attributesRequerente = requerenteAttributes.attributes.programTrackedEntityAttributes.filter(element => {
                return element.searchable === true
            })

            const components = [];
            for (let i = 0; i < response.relationShips.length; i++) {
                if (trackedEntitytype === "Pessoa") {
                    setRelationStatusLoad(true)
                    await engine.query(relationShipsStatus, {
                        variables: { id: response.relationShips[i].to.trackedEntityInstance.trackedEntityInstance },
                        onComplete: (res) => {
                            response.relationShips[i].status = res.status.enrollments[0].status;
                            setRelationStatusLoad(false)
                        }
                    })
                }

                if (response.relationShips[i].relationshipName === "Processo - Requerente") {
                    // response.relationShips[i].relationshipName = "Processo - Requerente(s)"
                    relationShipCount.requerentes++;
                } else {
                    relationShipCount.menor++;
                }
                // response.relationShips[i].relationshipName =
                //     response.relationShips[i].relationshipName.split("- ")[1];
            }

            if (object?.enrollments[0]?.status) {
                if (trackedEntitytype === "Processo") {
                    response.relationShips.sort((a, b) => a.relationshipName.localeCompare(b.relationshipName))
                    if (relationShipCount.menor === 0) {
                        components.push(
                            <div className='button-container col-12 col-sm-4 col-lg-12'>
                                <Button disabled={object?.enrollments[0]?.status != "ACTIVE"} onClick={() => { handleShow(), setTeiData(prevState => ({ ...prevState, "relationName": "Processo - Menor", "processId": programId, "searchableFields": attributesMenor, "relationshipType": "lV1zpwI8U4a", "tei": teiId })) }} small name="Primary button" primary value="default">
                                    Adicionar menor
                                </Button>
                            </div>
                        )

                        if (relationShipCount.requerentes === 0) {
                            components.push(
                                <div className='button-container col-12 col-sm-4 col-lg-12'>
                                    <Button disabled={object?.enrollments[0]?.status != "ACTIVE"} onClick={() => { handleShow(), setTeiData(prevState => ({ ...prevState, "relationName": "Processo - Requerente", "processId": programId, "searchableFields": attributesRequerente, "relationshipType": "QsCI6R1PKM1", "tei": teiId })) }} small name="Primary button" primary value="default">Adicionar requerente
                                    </Button>
                                </div>
                            )
                        } else if (relationShipCount.requerentes === 1) {
                            components.push(
                                <div className='requerente-relation_card col-12 col-sm-4 col-lg-12'>
                                    <span className='process-label'>{response.relationShips[0].relationshipName}</span>
                                    <CardProccessMng
                                        setSelectRelationShip={setSelectRelationShip}
                                        trackerData={response.relationShips[0]}
                                        handleShow={handleShowRemoval}
                                        pocessId={attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv024")}
                                        dateIn={`Cadastrado à ${getRelativeTime(new Date().getTime() - new Date(response.relationShips[0].from.trackedEntityInstance.created).getTime())}`}
                                        age={`${getAge(attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv007"))}`}
                                        sex={`${getGender(attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv006"))}`}
                                        name={`${attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv004")}`} />

                                </div>
                            )
                            components.push(
                                <div className='button-container col-12 col-sm-4 col-lg-12'>
                                    <Button disabled={object?.enrollments[0]?.status != "ACTIVE"} onClick={() => { handleShow(), setTeiData(prevState => ({ ...prevState, "relationName": "Processo - Requerente", "processId": programId, "searchableFields": attributesRequerente, "relationshipType": "QsCI6R1PKM1", "tei": teiId })) }} small name="Primary button" primary value="default">Adicionar requerente</Button>
                                </div>
                            )
                        } else {
                            components.push(
                                <div className='col-12 col-sm-4 col-lg-12'>
                                    <span className='process-label'>{response.relationShips[1].relationshipName}</span>
                                </div>
                            )
                            for (let i = 0; i < 2; i++) {
                                components.push(
                                    <div className='requerente-relation_card col-12 col-sm-4 col-lg-12'>
                                        <CardProccessMng
                                            handleShow={handleShowRemoval}
                                            setSelectRelationShip={setSelectRelationShip}
                                            trackerData={response.relationShips[i]}
                                            pocessId={attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv024")}
                                            dateIn={`Cadastrado à ${getRelativeTime(new Date().getTime() - new Date(response.relationShips[i].from.trackedEntityInstance.created).getTime())}`}
                                            age={`${getAge(attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv007"))}`}
                                            sex={`${getGender(attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv006"))}`}
                                            name={`${attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv004")}`} />
                                    </div>
                                )
                            }
                        }

                        //================================================================
                    } else if (relationShipCount.menor === 1) {
                        components.push(
                            <div className='menor-relation_card col-12 col-sm-4 col-lg-12'>
                                <span className='process-label'>{response.relationShips[0].relationshipName}</span>
                                <CardProccessMng
                                    handleShow={handleShowRemoval}
                                    setSelectRelationShip={setSelectRelationShip}
                                    trackerData={response.relationShips[0]}
                                    pocessId={attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv024")}
                                    dateIn={`Cadastrado à ${getRelativeTime(new Date().getTime() - new Date(response.relationShips[0].from.trackedEntityInstance.created).getTime())}`}
                                    age={`${getAge(attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv007"))}`}
                                    sex={`${getGender(attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv006"))}`}
                                    name={`${attributeFilter(response.relationShips[0].from.trackedEntityInstance.attributes, "Redsyjfv004")}`} />
                            </div>
                        )


                        if (relationShipCount.requerentes === 0) {
                            components.push(
                                <div className='button-container col-12 col-sm-4 col-lg-12'>
                                    <Button disabled={object?.enrollments[0]?.status != "ACTIVE"} onClick={() => { handleShow(), setTeiData(prevState => ({ ...prevState, "relationName": "Processo - Requerente", "processId": programId, "searchableFields": attributesRequerente, "relationshipType": "QsCI6R1PKM1", "tei": teiId })) }} small name="Primary button" primary value="default">Adicionar requerente
                                    </Button>
                                </div>
                            )
                        } else if (relationShipCount.requerentes === 1) {
                            components.push(
                                <div className='requerente-relation_card col-12 col-sm-4 col-lg-12'>
                                    <span className='process-label'>{response.relationShips[1].relationshipName}</span>
                                    <CardProccessMng
                                        handleShow={handleShowRemoval}
                                        setSelectRelationShip={setSelectRelationShip}
                                        trackerData={response.relationShips[1]}
                                        pocessId={attributeFilter(response.relationShips[1].from.trackedEntityInstance.attributes, "Redsyjfv024")}
                                        dateIn={`Cadastrado à ${getRelativeTime(new Date().getTime() - new Date(response.relationShips[1].from.trackedEntityInstance.created).getTime())}`}
                                        age={`${getAge(attributeFilter(response.relationShips[1].from.trackedEntityInstance.attributes, "Redsyjfv007"))}`}
                                        sex={`${getGender(attributeFilter(response.relationShips[1].from.trackedEntityInstance.attributes, "Redsyjfv006"))}`}
                                        name={`${attributeFilter(response.relationShips[1].from.trackedEntityInstance.attributes, "Redsyjfv004")}`} />

                                </div>
                            )
                            components.push(
                                <div className='button-container col-12 col-sm-4 col-lg-12'>
                                    <Button disabled={object?.enrollments[0]?.status != "ACTIVE"} onClick={() => { handleShow(), setTeiData(prevState => ({ ...prevState, "relationName": "Processo - Requerente", "processId": programId, "searchableFields": attributesRequerente, "relationshipType": "QsCI6R1PKM1", "tei": teiId })) }} small name="Primary button" primary value="default">Adicionar requerente</Button>
                                </div>
                            )
                        } else if (relationShipCount.requerentes === 2) {
                            components.push(
                                <div className='col-12 col-sm-4 col-lg-12'>
                                    <span className='process-label'>{response.relationShips[1].relationshipName}</span>
                                </div>
                            )
                            for (let i = 1; i < 3; i++) {
                                components.push(
                                    <div className='requerente-relation_card col-12 col-sm-4 col-lg-12'>
                                        <CardProccessMng
                                            setSelectRelationShip={setSelectRelationShip} trackerData={response.relationShips[i]}
                                            handleShow={handleShowRemoval}
                                            pocessId={attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv024")}
                                            dateIn={`Cadastrado à ${getRelativeTime(new Date().getTime() - new Date(response.relationShips[i].from.trackedEntityInstance.created).getTime())}`}
                                            age={`${getAge(attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv007"))}`}
                                            sex={`${getGender(attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv006"))}`}
                                            name={`${attributeFilter(response.relationShips[i].from.trackedEntityInstance.attributes, "Redsyjfv004")}`} />

                                    </div>
                                )
                            }
                        }
                    }
                } else if (trackedEntitytype === "Pessoa") {
                    response.relationShips.sort((a, b) => a.status.localeCompare(b.status))

                    const activeRelations = response.relationShips.filter(element => {
                        return element.status === "ACTIVE"
                    })

                    const inactiveRelations = response.relationShips.filter(element => {
                        return element.status !== "ACTIVE"
                    })

                    if (activeRelations.length > 0) {
                        components.push(
                            <div className='col-12 col-sm-6 col-lg-12 my-2'>
                                <span className='process-label'>Processos em curso</span>
                            </div>
                        )

                        for (const relation of activeRelations) {
                            components.push(
                                <div className='col-12 col-sm-6 col-lg-12 mb-2'>
                                    <CardProcessos warning processId={attributeFilter(relation.to.trackedEntityInstance.attributes, "Redsyjfv025")} processType={attributeFilter(relation.to.trackedEntityInstance.attributes, "dIjFDf8XU2p")} processDate={`Iniciado a: ${getRelativeTime(new Date().getTime() - new Date(relation.created).getTime())}`} />
                                </div>
                            )
                        }
                    }

                    if (inactiveRelations.length > 0) {
                        components.push(
                            <div className='col-12 col-sm-6 col-lg-12 my-2'>
                                <span className='process-label'>Processos Findos</span>
                            </div>
                        )

                        for (const relation of inactiveRelations) {
                            components.push(
                                <div className='col-12 col-sm-6 col-lg-12 mb-2'>
                                    <CardProcessos error processId={attributeFilter(relation.to.trackedEntityInstance.attributes, "Redsyjfv025")} processType={attributeFilter(relation.to.trackedEntityInstance.attributes, "dIjFDf8XU2p")} processDate={`Iniciado a: ${getRelativeTime(new Date().getTime() - new Date(relation.created).getTime())}`} />
                                </div>
                            )
                        }
                    }
                }

                setRelationships(response.relationShips);
                setRelationComponents(components)
                setLoadRelationships(false);
            }
        }
    })
}

export {fetchRelationShips};