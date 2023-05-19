import { useDataEngine, useDataMutation } from '@dhis2/app-runtime'
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

const SYSTEM_IDS = {
    results: {
        resource: "system/id",
        params: ({ limit }) => ({
            limit: limit
        })
    }
}


const EVENTS = {
    resource: "events",
    type: 'create',
    data: ({ data }) => data,
    params: {
        strategy: 'CREATE_AND_UPDATE',
        async: false,
    },
}

let sysIds, curTEIs = [], prg = {}
export function useTransferTEI() {
    const engine = useDataEngine()
    const { setTEItransfered, tEItransfered, allTeisFormated, programSelected, setselectRows } = useContext(GeneratedVaribles)
    const [loading, setloading] = useState(false)
    const { add } = useParams()
    const copyTEITransfered = []
    const [controlError, setcontrolError] = useState(true)

    const [mutate, response] = useDataMutation(EVENTS)

    function getTeiDetails(tei, program) {
        return (`${program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id] || "---"};${program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${tei?.[program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id] || "---"}`)
    }

    const transferTEI = async (program, ou, teis) => {
        setloading(true)
        const copyTEITransfered = []
        for (const tei of teis) {

            const name = getTeiDetails(tei, program)
            await engine.mutate(TRANSFERQUERY, {
                variables: {
                    program: program.value,
                    ou: ou,
                    trackedEntityInstance: tei.id
                }
            })
                .then(e => {
                    if (e.status === "ERROR") {
                        copyTEITransfered.push({ name: name, status: "ERROR", error: e.response.importSummaries?.[0]?.description || e?.message || e })
                    } else {
                        copyTEITransfered.push({ name: name, status: "SUCCESS" })
                    }
                }).catch(e => {
                    copyTEITransfered.push({ name: name, status: "ERROR", error: e.response.importSummaries?.[0]?.description || e.response.importSummaries[0]?.conflicts?.map(x => x.value).join(", ") || e?.message || e })
                })

            setTEItransfered(copyTEITransfered)
        }
        setloading(false)
        add("reload", true)
        setselectRows([])
    }

    // eslint-disable-next-line max-params
    const transferEvent = async (program, ou, programStage, reportDate, teis) => {
        setloading(true)
        setcontrolError(true)
        let systemIds = await engine.query(SYSTEM_IDS, { variables: { limit: teis.length } })
        systemIds = systemIds?.results?.codes
        sysIds = systemIds
        curTEIs = teis
        prg = program

        const data = []
        for (const tei of teis) {
            data.push({
                "event": systemIds[teis.indexOf(tei)],
                "trackedEntityInstance": tei.id,
                "program": program?.value,
                "programStage": programStage?.code,
                "enrollment": "lKFU7teKuuk",
                "orgUnit": ou,
                "notes": [],
                "dataValues": [],
                "status": "SCHEDULE",
                "dueDate": reportDate
            })
        }
        await mutate({ data: { events: data } }).then((e) => {
            for (const event of systemIds) {
                const name = getTeiDetails(teis[systemIds.indexOf(event)], program)
                const currentValue = e?.response?.importSummaries?.filter(x => x?.description?.includes(teis[systemIds.indexOf(event)]) || x.reference === event)

                if (currentValue.length > 0) {
                    copyTEITransfered.push({
                        name: name,
                        status: currentValue[0].status,
                        error: currentValue[0].conflicts.map(x => x.value).join(", ") || currentValue[0].description
                    })
                }
            }
            setTEItransfered(copyTEITransfered)
            setloading(false)
            add("reload", true)
            setselectRows([])
        })
    }


    if (response.error && controlError) {
        setcontrolError(false)

        for (const event of sysIds) {
            const name = getTeiDetails(curTEIs[sysIds.indexOf(event)], prg)
            const currentValue = response?.error?.details?.response?.importSummaries?.filter(x => x?.description?.includes(curTEIs[sysIds.indexOf(event)]) || x.reference === event)

            if (currentValue?.length > 0) {
                copyTEITransfered.push({
                    name: name,
                    status: currentValue[0].status,
                    error: currentValue[0].conflicts?.map(x => x.value).join(", ") || currentValue[0]?.description
                })
            }
        }

        if (copyTEITransfered.length === 0) {
            for (const tei of curTEIs) {
                const name = getTeiDetails(tei, prg)

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
        transferTEI,
        transferEvent
    }

}