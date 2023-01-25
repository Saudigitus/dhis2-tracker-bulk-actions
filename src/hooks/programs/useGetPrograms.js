import { useState } from "react";
import { useFetchData } from "../common/useFetchData"
import useShowAlerts from "../common/useShowAlerts"


const resource = (type, fields) => ({
    resource: "programs",
    fields,
    params: {
        filter: "programType:eq:" + type
    }
})


export const useGetPrograms = (type, fields = "id~rename(value),displayName~rename(label)") => {
    const { showPopUpNotification } = useShowAlerts()
    const { objects, loading, error } = useFetchData(
        resource(type, fields),
        false
    )
    const [controlRender, setcontrolRender] = useState(true)

    if (controlRender && error) {
        setcontrolRender(false)
        showPopUpNotification(error, "error")
        console.log(error);
    }

    return {
        programs: objects,
        loading
    }
}