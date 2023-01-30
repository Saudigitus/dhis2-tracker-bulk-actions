

function formatDataElements(data) {
    const headers = []
    for (const programStage of data?.programStages || []) {
        for (const dataElement of programStage.programStageDataElements) {
            headers.push({
                id: dataElement?.dataElement?.id,
                header: dataElement?.dataElement?.displayName,
                visible: dataElement?.displayInReports,
                optionSet: dataElement?.dataElement?.optionSet?.id,
                valueType: dataElement?.dataElement?.optionSet ? "optionSet" : dataElement?.dataElement?.valueType,
            })
        }
    }
    return headers
}


function formatAttributes(data) {
    const headers = []
    for (const trackedEntityAttribute of data?.programTrackedEntityAttributes || []) {
        headers.push({
            id: trackedEntityAttribute?.trackedEntityAttribute?.id,
            header: trackedEntityAttribute?.trackedEntityAttribute?.displayName,
            visible: trackedEntityAttribute?.displayInList,
            searchable: trackedEntityAttribute?.searchable,
            valueType: trackedEntityAttribute?.trackedEntityAttribute?.optionSet ? "optionSet" : trackedEntityAttribute?.trackedEntityAttribute?.valueType,
            optionSets: trackedEntityAttribute?.trackedEntityAttribute?.optionSet?.options

        })
    }
    return headers
}



export const formatResponse = (type, data) => {
    if (type === "WITH_REGISTRATION") {
        return formatAttributes(data)
    } else if (type === "WITHOUT_REGISTRATION") {
        return formatDataElements(data)
    }
}