import { useState } from "react";
import { formatResponseDefaultEvents } from "../../utils/events/formatResponseEvents"
import { useFetchData } from "../common/useFetchData"
import useShowAlerts from "../common/useShowAlerts"

const resource = (id) => ({
    resource: "tracker/events",
    variables: { id }
})

export const useGetEventByID = (props) => {
    const { showPopUpNotification } = useShowAlerts()
    const { eventID } = props

    const { error, loading, objects, validationText, getData } = useFetchData(
        resource(eventID),
        false
    )

    const [controlRender, setcontrolRender] = useState(true)

    if (controlRender && error) {
        setcontrolRender(false)
        showPopUpNotification(error, "error")
        console.log(error);
    }

    return {
        error,
        loadingTei: loading,
        data: objects,
        validationText,
        getData,
        dataValues: formatResponseDefaultEvents(objects),
        enrollment: objects?.enrollment
    }

}