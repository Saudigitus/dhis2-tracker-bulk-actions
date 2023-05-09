
export const generalQuery = (resource, fields = "", params = {}) => ({
    data: {
        resource: resource,
        id: ({ id }) => id,
        params: {
            fields,
            ...params
        }
    }
})