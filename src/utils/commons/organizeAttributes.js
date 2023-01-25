

export const organizeAttributes = (data) => {
    const response = []
    Object.keys(data).forEach((x) => {
        if (x !== "enrollmentDate") {
            response.push({ "attribute": x, "value": data[x] })
        }
    })
    return response;
}