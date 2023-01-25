import { useState } from "react";
import { formatProgramRules } from "../../utils/programRules/formatProgramRules"
import { useFetchData } from "../common/useFetchData"
import useShowAlerts from "../common/useShowAlerts"


const resource = (program) => ({
    resource: "programRules",
    fields: "id,displayName,condition,description,program[id],programStage[id],priority,programRuleActions[id,content,location,data,programRuleActionType,programStageSection[id],dataElement[id],trackedEntityAttribute[id],option[id],optionGroup[id],programIndicator[id],programStage[id]]",
    params: {
        filter: `program.id:like:${program}`,
        paging: false
    }
})


export const useGetProgramRules = (program) => {
    const { showPopUpNotification } = useShowAlerts()
    const { objects, loading, error } = useFetchData(
        resource(program),
        false
    )  
    const [controlRender, setcontrolRender] = useState(true)

    if (controlRender && error) {
        setcontrolRender(false)
        showPopUpNotification(error, "error")
        console.log(error);
    }

    return {
        programRules: formatProgramRules(objects),
        loadingPRules: loading
    }
}