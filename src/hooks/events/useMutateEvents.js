import { useDataMutation } from '@dhis2/app-runtime'
// eslint-disable-next-line import/extensions
import { useState } from "react";
import useShowAlerts from '../common/useShowAlerts'

const mutateEnrolment = {
    resource: 'tracker',
    data: ({ data }) => data,
    type: 'create',
    params: {
        async: false,
    },
}

const mutateEnrolmentEdit = {
    resource: 'events',
    id: ({ eventID }) => eventID,
    data: ({ data }) => data,
    type: 'update',
    params: {
        async: false,
    },
}

export const useCreateEvents = ({ message, onComplete }) => {
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

    if (controlRender && error) {
        setcontrolRender(false)
        showPopUpNotification(error, "error")
        console.log(error);
    }

    if (data && controlRender) {
        showPopUpNotification(message, 'success')
        setcontrolRender(false)
    }

    return {
        loading,
        mutate,
        data,
    }
}

export const useEditEvents = ({ message, onComplete }) => {
    const [mutateUpdate, { data, loading, error }] = useDataMutation(
        mutateEnrolmentEdit,
        {
            onComplete: (params) => {
                onComplete(params)
            },
        },
        { lazy: true }
    )
    const { showPopUpNotification } = useShowAlerts()
    const [controlRender, setcontrolRender] = useState(true)

    if (controlRender && error) {
        setcontrolRender(false)
        showPopUpNotification(error, "error")
        console.log(error);
    }

    if (data && controlRender) {
        showPopUpNotification(message, 'success')
        setcontrolRender(false)
    }

    return {
        loading,
        mutateUpdate,
        data,
    }
}
