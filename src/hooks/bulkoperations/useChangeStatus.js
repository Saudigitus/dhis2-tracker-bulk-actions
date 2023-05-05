import { useDataEngine } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'

const TRACKER_UPDATE = {
    resource: "trackedEntityInstances",
    type: 'create',
    // id: ({ id }) => id,
    data: ({ data }) => data
}

const TRACKERQUERY = {
    results: {
        resource: "trackedEntityInstances",
        id: ({ id }) => id,
        params: ({ program, ou }) => ({
            program: program,
            ou: ou,
            fields: "*"
        })
    }
}

export function useChangeStatus() {
    const engine = useDataEngine()
    const { setTEItransfered, tEItransfered, allTeisFormated, programSelected, setselectRows, orgUnitSelected } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()

    function getTeiDetails(tei, program) {
        const teiToMove = allTeisFormated.find(x => x.id === tei)
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id]};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id]}`)
    }

    const changeProgramStatus = async (program, status, teis) => {
        setloading(true)
        const copyTEITransfered = []
        for (const tei of teis) {
            const teiValue = await engine.query(TRACKERQUERY, {
                variables: {
                    id: tei,
                    program: program?.value,
                    ou: orgUnitSelected?.id
                }
            })

            let teiToUpdate = teiValue?.results
            teiToUpdate.status = status
            teiToUpdate = { ...teiToUpdate, program: program?.value }
        
            await engine.mutate(TRACKER_UPDATE, {
                variables: {
                    data: teiToUpdate,
                    id: tei
                }
            }).then(e => {
                copyTEITransfered.push({ name: getTeiDetails(tei, program), status: "Saved successfuly" })
            }).catch(e => {
                copyTEITransfered.push({ name: getTeiDetails(tei, program), status: "error", error: e?.message || e })
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