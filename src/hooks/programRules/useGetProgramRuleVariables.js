import { useState } from "react";
import { formatProgramRuleVariables } from "../../utils/programRules/formatProgramRules"
import { useFetchData } from "../common/useFetchData"
import useShowAlerts from "../common/useShowAlerts"


const resource = (program) => ({
    resource: "programRuleVariables",
    fields: "name,dataElement,trackedEntityAttribute",
    params: {
        filter: [`program.id:eq:${program}`, "name:ne:default"],
        paging: false
    }
})


export const useGetProgramRuleVariables = (program, setDisable) => {
    const { showPopUpNotification } = useShowAlerts()
    const { objects, loading, error, getData } = useFetchData(
        resource(program),
        false,
        setDisable
    )
    const [controlRender, setcontrolRender] = useState(true)

    if (controlRender && error) {
        setcontrolRender(false)
        showPopUpNotification(error, "error")
        console.log(error);
    }

    return {
        programRuleVariables: formatProgramRuleVariables(objects),
        loadingPRuleVariables: loading,
        getData
    }
}