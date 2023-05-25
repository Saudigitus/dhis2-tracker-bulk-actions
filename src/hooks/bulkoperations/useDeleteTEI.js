import { useDataEngine } from '@dhis2/app-runtime'
import { useContext, useState } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../common/useQueryParams'
import { get2AttributeTei } from '../../utils/commons/get2AttributeTei'

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
                    const name = get2AttributeTei(tei, program)
                    copyTEITransfered.push({
                        name: name,
                        status: e.response.importSummaries.find(x => x.reference === tei.id).status,
                        error: e.response.importSummaries.find(x => x.reference === tei.id).description  || e.response.importSummaries.find(x => x.reference === tei.id)?.conflicts?.map(x => x.value).join(", ")
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

    return {
        loading,
        deleteTEI,
    }
}
