

export function formatResponseEvents(object) {
    const arrayReturned = []
    const type = getTypeOfValue(object)
    if (type === 'programStageSection') {

        for (const programStageSection of object?.programStageSections || []) {
            const retunObject = {}
            const retundataElements = []
            retunObject.executionDateLabel = object.executionDateLabel
            retunObject.labelName = programStageSection.displayName
            retunObject.name = programStageSection.id
            retunObject.visible = true


            for (const dataElement of programStageSection.dataElements) {
                retundataElements.push({
                    required: dataElement.compulsory,
                    name: dataElement.id,
                    labelName: dataElement.displayName,
                    valueType: dataElement?.optionSet ? "LIST" : dataElement.valueType,
                    options: dataElement?.optionSet?.options || undefined,
                    visible: true
                })
            }

            retunObject["dataElements"] = retundataElements || [];

            arrayReturned.push(retunObject)
        }

    } else {
        for (const programStageDataElement of object?.programStageDataElements || []) {
            const retunObject = {}
            retunObject.executionDateLabel = object.executionDateLabel
            retunObject.required = programStageDataElement.compulsory
            retunObject.name = programStageDataElement.dataElement.id
            retunObject.labelName = programStageDataElement.dataElement.displayName
            retunObject.valueType = programStageDataElement.dataElement?.optionSet ? "LIST" : programStageDataElement.dataElement.valueType
            retunObject.options = programStageDataElement.dataElement?.optionSet?.options || undefined
            retunObject.visible = true

            arrayReturned.push(retunObject)
        }
    }

    return { object: arrayReturned, type }
}

export function formatResponseEventsEdit(dataValues) {
    const headers = {}

    for (const dataValue of dataValues || []) {
        headers[dataValue?.dataElement] = dataValue.value
    }

    return headers
}

export function formatResponseDefaultEvents(dataValues) {
    const headers = {}

    for (const dataValue of dataValues?.dataValues || []) {
        headers[dataValue?.dataElement] = dataValue.value
    }

    return headers
}


function getTypeOfValue(variables) {
    if (variables?.programStageSections?.length > 0) {
        return "programStageSection"
    }
    return "programStage"
}