import { useDataEngine } from '@dhis2/app-runtime'
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

export function useCreateEnrollment() {
    const engine = useDataEngine()
    const { setTEItransfered, allTeisFormated, setselectRows } = useContext(GeneratedVaribles)
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
    const createEnrollment = async (program, orgUnit, teis, enrollmentDate, incidentDate) => {
        setloading(true)
        const copyTEITransfered = []
        const data = []
        const teiToUpdate = []

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
            await engine.mutate(ENROLLMENTS_UPDATE, {
                variables: {
                    data: { enrollments: teiToUpdate },
                }
            }).catch(e => {
                console.log("response", e);
            }).then((e) => {
                for (const tei of teis) {
                    const name = getTeiDetails(tei, program)

                    copyTEITransfered.push({
                        name: name,
                        status: e.response.importSummaries.find(x => x.reference === tei.activeEnrollment.enrollment).status,
                        error: e.response.importSummaries.find(x => x.reference === tei.activeEnrollment.enrollment).conflicts.map(x => x.value).join(", ") || e.response.importSummaries.find(x => x.reference === tei.activeEnrollment.enrollment).description
                    })

                    if (e.response.importSummaries.find(x => x.reference === tei.activeEnrollment.enrollment).status === "ERROR") {
                        data.splice(data.findIndex(x => x.trackedEntityInstance === tei.id), 1)
                    }
                }
            })
        }

        if (data.length > 0) {
            await engine.mutate(ENROLLMENTS_CREATE, {
                variables: {
                    data: { enrollments: data },
                }
            })
                .then((e) => {
                    for (const tei of teis) {
                        const name = getTeiDetails(tei, program)
                        const currentValue = e.response.importSummaries.filter(x => x?.description?.includes(tei.id) || x.reference === tei.activeEnrollment.enrollment)

                        if (currentValue.length > 0) {
                            copyTEITransfered.push({
                                name: name,
                                status: currentValue[0].status,
                                error: currentValue[0]?.description
                            })
                        }
                    }
                })
                .catch(e => {
                    console.log("response", e);
                })
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