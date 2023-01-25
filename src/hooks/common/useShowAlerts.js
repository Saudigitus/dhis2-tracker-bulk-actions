import { useAlert } from '@dhis2/app-runtime';

const typeOfStatus = {
    success: { success: true },
    error: { critical: true },
    warning: { warning: true }
}


const useShowAlerts = () => {
    const { show: showAlert } = useAlert(
        ({ message }) => message,
        ({ type }) => type,
        ({ actions }) => actions,
        ({ permanent }) => permanent
    );

    // eslint-disable-next-line max-params
    function showPopUpNotification(message, type, actions) {
        showAlert({ message, type: { ...typeOfStatus[type], actions, permanent: true } })
    }

    return {
        showPopUpNotification
    }

}

export default useShowAlerts