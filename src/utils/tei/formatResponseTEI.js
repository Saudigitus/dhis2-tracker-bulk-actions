

export function formatResponseTEI(attributes) {
    const headers = []

    for (const trackedEntityAttribute of attributes?.programTrackedEntityAttributes || []) {
        headers.push({
            required: trackedEntityAttribute?.compulsory,
            name: trackedEntityAttribute?.trackedEntityAttribute?.id,
            labelName: trackedEntityAttribute?.trackedEntityAttribute?.displayName,
            valueType: trackedEntityAttribute?.trackedEntityAttribute?.optionSet ? "optionSet" : trackedEntityAttribute?.trackedEntityAttribute?.valueType,
            options: trackedEntityAttribute?.trackedEntityAttribute?.optionSet?.options || undefined,
            visible: true,
            disabled: trackedEntityAttribute?.trackedEntityAttribute?.generated || false,
            pattern: trackedEntityAttribute?.trackedEntityAttribute?.pattern || undefined,
            searchable: trackedEntityAttribute?.searchable,
        })
    }
    return headers

}


export function formatResponseDefaultTEI(attributes) {
    const headers = {}

    for (const attribute of attributes?.attributes || []) {
        headers[attribute?.attribute] = attribute.value
    }

    return headers
}

export function formatResponseDisplayNamesTEI(attributes) {
    const headers = {}

    for (const attribute of attributes?.attributes || []) {
        headers[attribute?.displayName] = attribute.value
    }

    return headers
}