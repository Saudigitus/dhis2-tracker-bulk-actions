import { useDataEngine, useDataMutation } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'

const ENROLLMENTS_CREATE = {
    resource: "enrollments",
    type: 'create',
    data: ({ data }) => data,
    params: {
        strategy: 'CREATE_AND_UPDATE',
        async: false,
    },
}

const ENROLLMENTS_UPDATE = {
    resource: "enrollments",
    type: 'create',
    data: ({ data }) => data,
    params: {
        strategy: 'CREATE_AND_UPDATE',
        async: false,
    },
}

let curTEIs = [], prg = {}
export function useCreateEnrollment() {
    const engine = useDataEngine()
    const { setTEItransfered, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()
    const copyTEITransfered = []

    const [mutate, response] = useDataMutation(ENROLLMENTS_UPDATE)
    const [mutateSecond, responseSecond] = useDataMutation(ENROLLMENTS_UPDATE)
    const [controlError, setcontrolError] = useState(true)

    function getTeiDetails(tei, program) {
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id] || "---"};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id] || "---"}`)
    }

    function getMessage(program, currentEnrollment) {
        if (!program.selectEnrollmentDatesInFuture && new Date(currentEnrollment.enrollmentDate) > new Date() && !program.selectIncidentDatesInFuture && new Date(currentEnrollment.incidentDate) > new Date()) {
            return `The current enrollment can't be completed because enrollment Date can't be future date: ${currentEnrollment.enrollmentDate} and incident Date can't be future date: ${currentEnrollment.incidentDate}`
        } else if (!program.selectEnrollmentDatesInFuture && new Date(currentEnrollment.enrollmentDate) > new Date()) {
            return `The current enrollment can't be completed because enrollment Date can't be future date: ${currentEnrollment.enrollmentDate}`
        } else if (!program.selectIncidentDatesInFuture && new Date(currentEnrollment.incidentDate) > new Date()) {
            return `The current enrollment can't be completed because incident Date can't be future date: ${currentEnrollment.incidentDate}`
        }
    }

    // eslint-disable-next-line max-params
    const createEnrollment = async (program, orgUnit, teis, enrollmentDate, incidentDate) => {
        setloading(true)
        setcontrolError(true)
        const data = []
        const teiToUpdate = []
        curTEIs = teis
        prg = program

        for (const tei of teis) {
            const currentEnrollment = tei.activeEnrollment || {}
            const name = getTeiDetails(tei, program)

            data.push({
                "trackedEntityInstance": tei.id,
                "trackedEntityType": program.trackedEntityType.id,
                "program": program.value,
                "status": "ACTIVE",
                "orgUnit": orgUnit,
                "enrollmentDate": enrollmentDate,
                "incidentDate": incidentDate || undefined
            })


            // eslint-disable-next-line no-prototype-builtins
            if (currentEnrollment.hasOwnProperty("enrollment")) {
                currentEnrollment.status = "COMPLETED"
                delete currentEnrollment.events
                delete currentEnrollment.attributes
                if (!program.selectEnrollmentDatesInFuture && new Date(currentEnrollment.enrollmentDate) > new Date() || !program.selectIncidentDatesInFuture && new Date(currentEnrollment.incidentDate) > new Date()) {
                    copyTEITransfered.push({
                        name: name,
                        status: "ERROR",
                        error: getMessage(program, currentEnrollment)
                    })

                    data.splice(data.findIndex(x => x.trackedEntityInstance === tei.id), 1)
                } else {
                    teiToUpdate.push(currentEnrollment)
                }
            }

        }

        if (teiToUpdate.length > 0) {
            await mutate({ data: { enrollments: teiToUpdate } })
                .then((e) => {
                    for (const tei of teis) {
                        const name = getTeiDetails(tei, program)
                        const currentValue = e.response.importSummaries.filter(x => x?.description?.includes(tei.id) || x.reference === tei.activeEnrollment.enrollment)

                        if (currentValue.length > 0) {
                            copyTEITransfered.push({
                                name: name,
                                status: currentValue[0].status,
                                error: currentValue[0]?.description || currentValue[0]?.conflicts?.map(x => x.value).join(", ")
                            })
                        }
                    }
                    // setTEItransfered(copyTEITransfered)
                    // setloading(false)
                    // add("reload", true)
                    // setselectRows([])
                })
        }

        if (data.length > 0) {
            await mutateSecond({ data: { enrollments: data } })
                .then((e) => {
                    for (const tei of teis) {
                        const name = getTeiDetails(tei, program)
                        const currentValue = e.response.importSummaries.filter(x => x?.description?.includes(tei.id) || x.reference === tei.activeEnrollment.enrollment)

                        if (currentValue.length > 0) {
                            copyTEITransfered.push({
                                name: name,
                                status: currentValue[0].status,
                                error: currentValue[0]?.description || currentValue[0]?.conflicts?.map(x => x.value).join(", ")
                            })
                        }
                    }
                    setTEItransfered(copyTEITransfered)
                    setloading(false)
                    add("reload", true)
                    setselectRows([])
                })
        }
    }


    if ((response.error || responseSecond.error) && controlError) {
        setcontrolError(false)

        for (const tei of curTEIs) {
            const name = getTeiDetails(tei, prg)
            const currentValue = (response|| responseSecond)?.error?.details?.response?.importSummaries.filter(x => x.reference === tei.enrollments[0].enrollment || x?.description?.includes(tei.id))

            if (currentValue?.length > 0) {
                copyTEITransfered.push({
                    name: name,
                    status: currentValue[0]?.status,
                    error: currentValue[0]?.description || currentValue[0]?.conflicts?.map(x => x.value).join(", ")
                })
            } else {
                copyTEITransfered.push({
                    name: name,
                    status: "ERROR",
                    error: (response|| responseSecond)?.error?.details?.message
                })
            }

        }

        setTEItransfered(copyTEITransfered)
        setloading(false)
        add("reload", true)
        setselectRows([])
    }

    return {
        loading,
        createEnrollment
    }

}