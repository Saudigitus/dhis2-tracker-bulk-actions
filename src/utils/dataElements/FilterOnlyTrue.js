export function filterOnlyTrue(dataElements) {
    const onlyTrueDataElements = []
    for (const dataElement of dataElements?.dataElements || []) {
        if (dataElement.valueType === "TRUE_ONLY") {
            onlyTrueDataElements.push(dataElement)
        }
    }
    return onlyTrueDataElements
}