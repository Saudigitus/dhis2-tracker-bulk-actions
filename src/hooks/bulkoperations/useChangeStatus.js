import { useDataEngine, useDataMutation } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'

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
export function useChangeStatus() {
    const { setTEItransfered, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()
    const copyTEITransfered = []

    const [mutate, response] = useDataMutation(ENROLLMENTS_UPDATE)
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
    const changeProgramStatus = async (program, status, teis) => {
        setloading(true)
        setcontrolError(true)
        const teiToUpdate = []
        curTEIs = teis
        prg = program

        for (const tei of teis) {
            const name = getTeiDetails(tei, program)

            const currentEnrollment = tei.enrollments[0]
            currentEnrollment.status = status
            delete currentEnrollment.events
            if (!program.selectEnrollmentDatesInFuture && new Date(currentEnrollment.enrollmentDate) > new Date() || !program.selectIncidentDatesInFuture && new Date(currentEnrollment.incidentDate) > new Date()) {
                copyTEITransfered.push({
                    name: name,
                    status: "ERROR",
                    error: getMessage(program, currentEnrollment)
                })

            } else {
                teiToUpdate.push(currentEnrollment)
            }

        }

        if (teiToUpdate.length > 0) {
            await mutate({ data: { enrollments: teiToUpdate } })
                .then((e) => {
                    for (const tei of teis) {
                        const name = getTeiDetails(tei, program)
                        const currentValue = e.response.importSummaries.filter(x => x.reference === tei.enrollments[0].enrollment || x?.description?.includes(tei.id))

                        if (currentValue.length > 0) {
                            copyTEITransfered.push({
                                name: name,
                                status: currentValue[0].status,
                                error: currentValue[0]?.description || currentValue[0]?.conflicts?.map(x => x.value).join(", ")
                            })
                        }

                    }
                })
        }
    }


    if (response.error && controlError) {
        setcontrolError(false)

        for (const tei of curTEIs) {
            const name = getTeiDetails(tei, prg)
            const currentValue = response?.error?.details?.response?.importSummaries.filter(x => x.reference === tei.enrollments[0].enrollment || x?.description?.includes(tei.id))

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
                    error: response?.error?.details?.message
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
        changeProgramStatus
    }

}