// eslint-disable-next-line import/extensions
import { formatResponse } from "../../utils/table/columns/formatResponse";
import { useFetchData } from "../common/useFetchData.js";

const fieldsType = {
    WITH_REGISTRATION: "programTrackedEntityAttributes[displayInList,searchable,trackedEntityAttribute[id,displayName,valueType,optionSet[options[code,displayName]]]]",
    WITHOUT_REGISTRATION: "programStages[programStageDataElements[displayInReports,dataElement[id,displayName,valueType,optionSet[id]]]]"
}

const resourceTypes = (fields, id) => ({
    resource: "programs",
    fields,
    variables: { id }
})

export const useHeader = ({ type, program }) => {
    const { error, loading, objects, validationText, getData } = useFetchData(
        resourceTypes(fieldsType[type], program),
        true
    )

    return {
        headers: formatResponse(type, objects) || [],
        error,
        loading,
        data: objects,
        validationText,
        getData
    }
}