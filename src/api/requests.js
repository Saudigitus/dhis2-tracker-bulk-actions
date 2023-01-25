import axios from "axios";

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

export function requestHeaders(auth) {
    if (process.env.NODE_ENV === 'production') {
        return {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    } else {
        return {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
}


var configQUERY = (data, config) => ({
    method: 'post',
    url: `${config.baseUrlApi}/api/mhosp/data/transfer`,
    data: data,
    headers: requestHeaders(config.config).headers
});


export const externalRequest = {
    postEvent: (data, config) => axios(configQUERY(data, config))

}