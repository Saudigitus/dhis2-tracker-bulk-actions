import { useDataEngine } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'

const ENROLLMENTS_UPDATE = {
    resource: "enrollments",
    type: 'update',
    id: ({ id }) => id,
    data: ({ data }) => data
}

export function useChangeStatus() {
    const engine = useDataEngine()
    const { setTEItransfered, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()

    function getTeiDetails(tei, program) {
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id] || "---"};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id] || "---"}`)
    }

    // eslint-disable-next-line max-params
    const changeProgramStatus = async (program, status, teis) => {
        setloading(true)
        const copyTEITransfered = []
        for (const tei of teis) {
            const name = getTeiDetails(tei, program)

            const teiToUpdate = tei.enrollment
            teiToUpdate.status = status
            delete teiToUpdate.events

            await engine.mutate(ENROLLMENTS_UPDATE, {
                variables: {
                    data: teiToUpdate,
                    id: teiToUpdate.enrollment,
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
        changeProgramStatus
    }

}