
import { useDataMutation } from "@dhis2/app-runtime"
// eslint-disable-next-line import/extensions
import { useState } from "react";
import useShowAlerts from "../common/useShowAlerts.js"

const mutateEnrolment = (params) => ({
    resource: "tracker",
    data: ({ data }) => data,
    type: "create",
    params: {
        async: false,
        ...params
    }
})

export const useCreateEvents = ({ message, params = undefined }) => {
    const [mutate, { data, loading, error }] = useDataMutation(mutateEnrolment(params), { lazy: true })
    const { showPopUpNotification } = useShowAlerts()
    const [controlRender, setcontrolRender] = useState(true)



    if (controlRender && error) {
        showPopUpNotification(error, "error")
        setcontrolRender(false)
        console.log(error);
    }

    if (data && controlRender) {
        showPopUpNotification(message, "success")
        setcontrolRender(false)
    }

    return {
        loading,
        mutate,
        data
    }
}