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

export function useTransferTEI() {
    const engine = useDataEngine()
    const { setTEItransfered, tEItransfered, allTeisFormated, programSelected, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()

    function getTeiDetails(tei, program) {
        const teiToMove = allTeisFormated.find(x => x.id === tei)
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id] || "---"};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${teiToMove?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id] || "---"}`)
    }

    const tranfer = async (program, ou, teis) => {
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
        tranfer,
        complete
    }
