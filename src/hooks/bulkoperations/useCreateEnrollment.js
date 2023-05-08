import { useDataEngine } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'

const ENROLLMENTS_CREATE = {
    resource: "enrollments",
    type: 'create',
    data: ({ data }) => data
}

export function useCreateEnrollment() {
    const engine = useDataEngine()
    const { setTEItransfered, allTeisFormated, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()

    function getTeiDetails(tei, program) {
        const teiToMove = allTeisFormated.find(x => x.id === tei)
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id]};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id]}`)
    }

    // eslint-disable-next-line max-params
    const createEnrollment = async (program, orgUnit, teis, enrollmentDate, incidentDate) => {
        setloading(true)
        const copyTEITransfered = []
        for (const tei of teis) {
            const name = getTeiDetails(tei, program)
            await engine.mutate(ENROLLMENTS_CREATE, {
                variables: {
                    data: {
                        "trackedEntityInstance": tei,
                        "program": program.value,
                        "status": "ACTIVE",
                        "orgUnit": orgUnit,
                        "enrollmentDate": enrollmentDate,
                        "incidentDate": incidentDate
                    }
                }
            })
                .then(e => {
                    if (e.status === "ERROR") {
                        copyTEITransfered.push({ name: name, status: "error", error: e?.response?.importSummaries[0]?.description || e?.message || e })
                    } else {
                        copyTEITransfered.push({ name: name, status: "SUCCESS" })
                    }
                }).catch(e => {
                    copyTEITransfered.push({ name: name, status: "error", error: e?.response?.importSummaries[0]?.description || e?.message || e })
                })

            setTEItransfered(copyTEITransfered)
        }
        setloading(false)
        add("reload", true)
        setselectRows([])
    }

    return {
        loading,
        createEnrollment
    }

}