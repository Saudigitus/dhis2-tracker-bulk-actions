import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React, { useState } from "react";
import { useCreateEvents } from "../../hooks/events/useCreateEvents";
import { useGetDataElements } from "../../hooks/events/useGetDataElements";
import { useGetProgramRules } from "../../hooks/programRules/useGetProgramRules";
import { useGetProgramRuleVariables } from "../../hooks/programRules/useGetProgramRuleVariables";
import { useGetTEIByID } from "../../hooks/tei/useGetTEIByID";
import { organizeDataValues } from "../../utils/commons/organizeDataValues";
import { programRulesUtilsSection } from "../../utils/programRules/programRulesUtils";
import EventFormComponent from "./EventSectionForm";

const formCreate = (dataValues, orgUnit, programStage, program, tei, enrollment, eventDate) => ({
    "events": [
        {
            "occurredAt": eventDate,
            "status": "ACTIVE",
            "program": program,
            "programStage": programStage,
            "orgUnit": orgUnit,
            "trackedEntityInstance": tei,
            "enrollment": enrollment,
            "scheduledAt": eventDate,
            "dataValues": dataValues
        }
    ]
})

function typeView(type) {
    if (type === "view") {
        return <span>Enrollment: View Event</span>
    } if (type === "edit") {
        return <span>Enrollment: Edit Event</span>
    } else {
        return <span>Enrollment: New Event</span>
    }
}

const orgUnit = 'DiszpKrYNg8'
const date = '2022-10-03'
function EventSectionComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { programStage, program, teiID = "IB7vDztwGNc" } = props
    const { loadingPRules, programRules } = useGetProgramRules(program)
    const { loadingPRuleVariables, programRuleVariables } = useGetProgramRuleVariables(program)
    const { dataElements = [], loading, executionDateLabel } = useGetDataElements({ programStage, type: "programStageSection" })
    const { data: enrollment, loadingTei } = useGetTEIByID({ teiID, program, fields: "enrollments[enrollment]" })
    const [values, setvalues] = useState({})

    const { loading: loadingMutate, mutate } = useCreateEvents({ message: "Events created successfully" })

    async function createEvent(form) {
        await mutate({ data: formCreate(organizeDataValues(form), orgUnit, programStage, program, teiID, enrollment.enrollments[0].enrollment, form["eventDate"]) });
    }


    if (loading || loadingTei || loadingPRules || loadingPRuleVariables) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    function onChange(e) {
        setvalues(e)
    }

    return (
        <EventFormComponent
            variables={programRulesUtilsSection(dataElements, values, programRules, programRuleVariables)}
            executionDateLabel={executionDateLabel}
            postEvents={createEvent}
            typeView={typeView("create")}
            loadingMutate={loadingMutate}
            type={"save"}
            onChange={onChange}
        />
    )
}

export default EventSectionComponent;