

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

function formatAttributesTracked(data, programStatus) {
    const column = []
    const teiEnrollment = {}

    for (const trackedEntityInstance of data || []) {
        const columnObj = {}

        columnObj["id"] = trackedEntityInstance.trackedEntityInstance
        for (const attribute of trackedEntityInstance?.attributes || []) {
            columnObj[attribute?.attribute] = attribute?.value
        }

        column.push(columnObj)
        teiEnrollment[trackedEntityInstance.trackedEntityInstance] = { enrollments: formatEnrollments(trackedEntityInstance.enrollments, programStatus) }
    }

    return {
        column: column,
        teiEnrollment: teiEnrollment
    }
}


function formatEnrollments(enrollments, programStatus) {
    const enrol = []
    for (const enrollment of enrollments.filter(x => x.status === programStatus) || []) {
        enrol.push({ value: enrollment.enrollment, label: enrollment.enrollmentDate })
    }

    return enrol
}

export const formatResponseData = (type, data, programStatus) => {
    if (data) {
        if (type === "WITH_REGISTRATION") {
            return formatAttributesTracked(data, programStatus)
        } else if (type === "WITHOUT_REGISTRATION") {
            return formatDataElementsEvents(data)
        }
    }
}