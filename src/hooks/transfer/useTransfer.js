import { useDataEngine } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'

const TRANSFERQUERY = {
    resource: "tracker/ownership/transfer",
    type: 'update',
    params: ({ program, ou, trackedEntityInstance }) => ({
        program: program,
        ou: ou,
        trackedEntityInstance: trackedEntityInstance
    })
}

const EVENTQUERY = {
    results: {
        resource: "events",
        params: ({ program, programStage, tei }) => ({
            program: program,
            programStage: programStage,
            trackedEntityInstance: tei,
            status: "SCHEDULE",
            fields: "status"
        })
    }
}

const EVENTQUERY_NOT_REPEATABLE = {
    results: {
        resource: "events",
        params: ({ program, programStage, tei }) => ({
            program: program,
            programStage: programStage,
            trackedEntityInstance: tei,
            fields: "status"
        })
    }
}


const EVENTMUTATE = {
    resource: "events",
    type: "create",
    data: ({ data }) => data
}

export function useTransferTEI() {
    const engine = useDataEngine()
    const { setTEItransfered, tEItransfered, allTeisFormated, programSelected, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()

    function getTeiDetails(tei, program) {
        const teiToMove = allTeisFormated.find(x => x.id === tei)
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id]};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id]}`)
    }

    const transferTEI = async (program, ou, teis) => {
        setloading(true)
        const copyTEITransfered = []
        for (const tei of teis) {

            const name = getTeiDetails(tei, program)
            await engine.mutate(TRANSFERQUERY, {
                variables: {
                    program: program.value,
                    ou: ou,
                    trackedEntityInstance: tei
                }
            }).then(e => {
                copyTEITransfered.push({ name: name, status: "Saved successfuly" })
            }).catch(e => {
                copyTEITransfered.push({ name: name, status: "error" })
            })
            console.log(name);
            setTEItransfered(copyTEITransfered)
        }
        setloading(false)
        add("reload", true)
        setselectRows([])
    }

    // eslint-disable-next-line max-params
    const transferEvent = async (program, ou, programStage, reportDate, teis) => {
        setloading(true)
        const copyTEITransfered = []

        for (const tei of teis) {
            const name = getTeiDetails(tei, program)
            console.log(name);
            if (!programStage?.repeatable) {
                const getEvents = await engine.query(EVENTQUERY_NOT_REPEATABLE, { variables: { program: program?.value, programStage: programStage?.code, tei: tei } })
                const events = getEvents?.results?.events

                if (events?.length > 0) {
                    copyTEITransfered.push({ name: name, status: "error", error: "This programStage is not repeatable, cannot create more events." })
                } else {
                    const data = {
                        "events": [
                            {
                                "trackedEntityInstance": tei,
                                "program": program?.value,
                                "programStage": programStage?.code,
                                "enrollment": "lKFU7teKuuk",
                                "orgUnit": ou,
                                "notes": [],
                                "dataValues": [],
                                "status": "SCHEDULE",
                                "dueDate": reportDate
                            }
                        ]
                    }
                    await engine.mutate(EVENTMUTATE, { variables: { data: data } }).then(() => {
                        copyTEITransfered.push({ name: name, status: "Saved successfuly" })

                    }).catch(e => {
                        copyTEITransfered.push({ name: name, status: "error", error: e })

                    })
                }

            } else {
                const getScheduleEvents = await engine.query(EVENTQUERY, { variables: { program: program?.value, programStage: programStage?.code, tei: tei } })
                const scheduleEvents = getScheduleEvents?.results?.events

                if (scheduleEvents?.length === 0) {
                    const data = {
                        "events": [
                            {
                                "trackedEntityInstance": tei,
                                "program": program?.value,
                                "programStage": programStage?.code,
                                "enrollment": "lKFU7teKuuk",
                                "orgUnit": ou,
                                "notes": [],
                                "dataValues": [],
                                "status": "SCHEDULE",
                                "dueDate": reportDate
                            }
                        ]
                    }
                    await engine.query(EVENTMUTATE, { variables: { data: data } }).then(() => {
                        copyTEITransfered.push({ name: name, status: "Saved successfuly" })

                    }).catch(e => {
                        copyTEITransfered.push({ name: name, status: "error", error: e })

                    })

                } else {
                    copyTEITransfered.push({ name: name, status: "error", error: "All the expected events are already present, cannot create more events." })
                }
            }
            setTEItransfered(copyTEITransfered)
        }

        console.log(copyTEITransfered);

        setloading(false)
        add("reload", true)
        setselectRows([])
    }

    const complete = async (teis) => {
        setloading(true)
        const copyTEITransfered = []
        for (const tei of teis) {

            const name = getTeiDetails(tei, programSelected.value)
            await engine.mutate(TRANSFERQUERY, {
                variables: {
                    program: programSelected.value.value,
                    trackedEntityInstance: tei
                }
            }).then(e => {
                copyTEITransfered.push({ name: name, status: "Saved successfuly" })
            }).catch(e => {
                copyTEITransfered.push({ name: name, status: "error" })
            })
            console.log(name);
            setTEItransfered(copyTEITransfered)
        }
    }

    return {
        loading,
        transferTEI,
        transferEvent,
        complete
    }

}