import { useDataMutation } from '@dhis2/app-runtime'
// eslint-disable-next-line import/extensions
import useShowAlerts from '../common/useShowAlerts'
import { useState } from "react";

const mutateEnrolment = {
    resource: 'tracker',
    data: ({ data }) => data,
    type: 'create',
    params: {
        async: false,
    },
}

export const useCreateEnrollment = ({ message, onComplete }) => {
    const [mutate, { data, loading, error }] = useDataMutation(
        mutateEnrolment,
        {
            onComplete: (params) => {
                onComplete(params)
            },
        },
        { lazy: true }
    )
    const { showPopUpNotification } = useShowAlerts()
    const [controlRender, setcontrolRender] = useState(true)

    if (controlRender && error	) {
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
        data,
    }
}
