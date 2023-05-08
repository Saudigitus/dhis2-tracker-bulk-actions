import { useDataEngine, useDataMutation } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'

const TRANSFERQUERY = {
    resource: 'trackedEntityInstances?strategy=DELETE',
    type: 'update',
    params: ({ program, ou, trackedEntityInstance }) => ({
        program: program,
        ou: ou,
        trackedEntityInstance: trackedEntityInstance,
    }),
}

const mutateDeleteTEI = {
    resource: 'trackedEntityInstances',
    type: 'create',
    data: ({ data }) => data,
    params: {
        strategy: 'DELETE',
        async: false,
    },
}

export function useDeleteTEI() {
    const engine = useDataEngine()
    const { setTEItransfered, tEItransfered, allTeisFormated, programSelected, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()
    const [mutate, { data, error }] = useDataMutation(mutateDeleteTEI)

    function getTeiDetails(tei, program) {
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id] || "---"};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id] || "---"}`)
    }

    const deleteTEI = async (program, teis, setShowSummaryModal) => {
        setloading(true)
        const copyTEITransfered = []
        const teisToDelete = []
        for (const tei of teis) {
            teisToDelete.push({ trackedEntityInstance: tei.id })
        }
        await engine
            .mutate(mutateDeleteTEI, {
                variables: { data: { trackedEntityInstances: teisToDelete } }
            })
            .then((e) => {
                for (const tei of teis) {
                    const name = getTeiDetails(tei, program)
                    copyTEITransfered.push({
                        name: name,
                        status: e.response.importSummaries.find(x => x.reference === tei.id).status,
                    })
                    setTEItransfered(copyTEITransfered)
                }
            })
            .catch((e) => {
                console.log("response", e)
            })
            setShowSummaryModal(true)
        setloading(false)
        setloading(false)
        add('reload', true)
        setselectRows([])
    }

    const complete = async (teis) => {
        setloading(true)
        const copyTEITransfered = []
        for (const tei of teis) {
            const name = getTeiDetails(tei, programSelected.value)
            await engine
                .mutate(TRANSFERQUERY, {
                    variables: {
                        program: programSelected.value.value,
                        trackedEntityInstance: tei.id,
                    },
                })
                .then((e) => {
                    copyTEITransfered.push({
                        name: name,
                        status: 'Saved successfuly',
                    })
                })
                .catch((e) => {
                    copyTEITransfered.push({ name: name, status: 'error' })
                })
            console.log(name)
            setTEItransfered(copyTEITransfered)
        }
    }

    return {
        loading,
        deleteTEI,
    }
}
