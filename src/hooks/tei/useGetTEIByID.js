import { useState } from "react";
import { formatResponseDefaultTEI, formatResponseDisplayNamesTEI } from "../../utils/tei/formatResponseTEI"
import { useFetchData } from "../common/useFetchData"
import useShowAlerts from "../common/useShowAlerts"

const fieldsType = (fields) => ({
    fields: fields || "attributes"
})

const resource = (id, program, fields) => ({
    resource: "tracker/trackedEntities",
    ...fieldsType(fields),
    params: {
        program: program
    },
    variables: { id }
})

export const useGetTEIByID = (props) => {
    const { showPopUpNotification } = useShowAlerts()
    const { teiID, program, fields, setDisable } = props

    const { error, loading, objects, validationText, getData } = useFetchData(
        resource(teiID, program, fields),
        false,
        setDisable
    )
    const [controlRender, setcontrolRender] = useState(true)



    if (controlRender && error) {
        showPopUpNotification(error, "error")
        setcontrolRender(false)
        console.log(error);
    }


    return {
        attributeValues: formatResponseDefaultTEI(objects) || [],
        displayNameValues: formatResponseDisplayNamesTEI(objects, program) || [],
        error,
        loadingTei: loading,
        data: objects,
        validationText,
        getData
    }

}