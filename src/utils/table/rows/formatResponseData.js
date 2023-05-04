

function formatDataElementsEvents(data) {
    const column = []
    for (const dataValues of data || []) {
        const columnObj = {}
        columnObj["id"] = dataValues.event
        columnObj["dataValues"] = dataValues.dataValues
        for (const dataElement of dataValues.dataValues) {
            columnObj[dataElement?.dataElement] = dataElement?.value
        }
        column.push(columnObj)
    }
    return column
}

function formatAttributesTracked(data) {
    const column = []
    for (const trackedEntityInstance of data || []) {
        const columnObj = {}
        columnObj["id"] = trackedEntityInstance.trackedEntityInstance

        for (const attribute of trackedEntityInstance?.attributes || []) {
            columnObj[attribute?.attribute] = attribute?.value
        }

        column.push(columnObj)
    }

    return column
}

export const formatResponseData = (type, data) => {
    if (data) {
        if (type === "WITH_REGISTRATION") {
            return formatAttributesTracked(data)
        } else if (type === "WITHOUT_REGISTRATION") {
            return formatDataElementsEvents(data)
        }
    }
}