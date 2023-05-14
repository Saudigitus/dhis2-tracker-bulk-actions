import { useDataEngine } from '@dhis2/app-runtime'
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

export function useChangeStatus() {
    const engine = useDataEngine()
    const { setTEItransfered, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()

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
        const copyTEITransfered = []
        const teiToUpdate = []
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
            await engine.mutate(ENROLLMENTS_UPDATE, {
                variables: {
                    data: { enrollments: teiToUpdate },
                }
            }).catch(e => {
                console.log("response", e);
            }).then((e) => {
                for (const tei of teis) {
                    const name = getTeiDetails(tei, program)
                    const currentValue = e.response.importSummaries.filter(x => x.reference === tei.enrollments[0].enrollment || x?.description?.includes(tei.id))

                    if (currentValue.length > 0) {
                        copyTEITransfered.push({
                            name: name,
                            status: currentValue[0].status,
                            error: currentValue[0]?.description
                        })
                    }

                }
            })
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