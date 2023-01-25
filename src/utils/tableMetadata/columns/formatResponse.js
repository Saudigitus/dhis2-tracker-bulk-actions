
export function formatAttributes(data) {
    const headers = []
    for (const property of data?.properties || []) {
        headers.push({
            id: property?.name,
            header: property?.name,
            visible: property?.required
        })
    }
    return headers
}
