export function getallInitVariables(sections) {
    const values = {};

    for (const section of sections) {
        for (const dataElement of section.dataElements) {
            values[dataElement.name] = ""
        }
    }

    return values;
}