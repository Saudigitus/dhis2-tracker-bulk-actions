import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React, { useState } from "react";
import { useCreateEvents } from "../../hooks/events/useCreateEvents";
import { useGetDataElements } from "../../hooks/events/useGetDataElements";
import { useGetEventByID } from "../../hooks/events/useGetEventByID";
import { useGetTEIByID } from "../../hooks/tei/useGetTEIByID";
import { organizeDataValues } from "../../utils/commons/organizeDataValues";
import EventFormComponent from "./EventForm";

const formUpdate = (dataValues, orgUnit, programStage, program, tei, enrollment, eventDate, event) => ({
    "events": [
        {
            "event": event,
            "program": program,
            "programStage": programStage,
            "enrollment": enrollment,
            "trackedEntity": tei,
            "orgUnit": orgUnit,
            "occurredAt": eventDate,
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
function EventComponentEdit(props) {
    // eslint-disable-next-line react/prop-types
    const { programStage, program, teiID = "mz4ayGxrbzp", event = "nHpQDCaFoxf" } = props
    const { dataElements = [], loading } = useGetDataElements({ programStage })
    const { dataValues, enrollment, loadingEvent, data } = useGetEventByID({ eventID: event })

    const { loading: loadingMutate, mutate } = useCreateEvents({ message: "Events edited successfully", params: { importStrategy: 'UPDATE' } })


    async function createEvent(form) {
        await mutate({ data: formUpdate(organizeDataValues(form), orgUnit, programStage, program, teiID, enrollment, data.occurredAt, event) });
    }


    if (loading || loadingEvent) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    return (
        <EventFormComponent
            variables={dataElements}
            postEvents={createEvent}
            typeView={typeView("edit")}
            loadingMutate={loadingMutate}
            initialValues={dataValues}
        />
    )
}

export default EventComponentEdit;