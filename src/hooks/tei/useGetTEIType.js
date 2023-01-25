// eslint-disable-next-line import/extensions
import { useState } from "react";
import { useFetchData } from "../common/useFetchData";
import useShowAlerts from "../common/useShowAlerts";

const resource = (id) => ({
    resource: "programs",
    variables: { id },
    fields: "trackedEntityType"
})

const useGetTEIType = (program) => {
    const { showPopUpNotification } = useShowAlerts()
    const { objects, error } = useFetchData(
        resource(program),
        false
    )

    const [controlRender, setcontrolRender] = useState(true)

    if (controlRender && error) {
        showPopUpNotification(error, "error")
        setcontrolRender(false)
        console.log(error);
    }


    return {
        teitype: objects?.trackedEntityType.id
    }
}

export default useGetTEIType;