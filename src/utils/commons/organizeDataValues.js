

export const organizeDataValues = (data) => {
    const response = []
    // console.log(Object.keys(data), data);
    Object.keys(data).forEach((x) => {
        if (x !== "eventDate") {
            response.push({ "dataElement": x, "value": data[x] })
        }
    })
    return response;
}