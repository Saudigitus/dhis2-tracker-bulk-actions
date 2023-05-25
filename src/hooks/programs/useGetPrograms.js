import { useState, useContext, useEffect } from "react";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles";
import { useFetchData } from "../common/useFetchData"
import useShowAlerts from "../common/useShowAlerts"


const resource = (type, fields) => ({
    resource: "programs",
    fields,
    params: {
        filter: "programType:eq:" + type
    }
})


export const useGetPrograms = (type, fields = "id~rename(value),displayName~rename(label),onlyEnrollOnce,displayIncidentDate,incidentDateLabel,selectEnrollmentDatesInFuture,selectIncidentDatesInFuture,enrollmentDateLabel,organisationUnits,programStages[id~rename(code),repeatable,displayName~rename(label)],trackedEntityType[id,name,trackedEntityTypeAttributes[trackedEntityAttribute[displayName,id]]],programTrackedEntityAttributes[trackedEntityAttribute[id,displayName]]") => {
    const { showPopUpNotification } = useShowAlerts()
    const { setprograms } = useContext(GeneratedVaribles)
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

    useEffect(() => {
        setprograms(objects)
    }, [objects])


    return {
        programs: objects,
        loading
    }
}