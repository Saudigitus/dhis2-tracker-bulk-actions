import { useEffect } from "react";
import { formatResponseEvents } from "../../utils/events/formatResponseEvents"
import { useFetchData } from "../common/useFetchData"

const fieldsType = {
    programStage: "executionDateLabel,programStageDataElements[displayInReports,compulsory,dataElement[id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]],programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]",
    programStageSection: "executionDateLabel,programStageSections[displayName,id,displayInReports,compulsory,dataElements[id,formName~rename(displayName),valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]"
}

const resource = (id, type) => ({
    resource: "programStages",
    fields: fieldsType[type],
    variables: { id }
})

export const useGetDataElements = (props) => {
    const { programStage, type = "programStage" } = props

    const { error, loading, objects, validationText, getData } = useFetchData(
        resource(programStage, type),
        false
    )

    useEffect(() => {
        if (programStage) {
            getData()
        }
    }, [programStage])

    return {
        dataElements: formatResponseEvents(objects).object || [],
        error,
        loading,
        data: objects,
        executionDateLabel: objects?.executionDateLabel,
        validationText,
        type: formatResponseEvents(objects).type
    }
}