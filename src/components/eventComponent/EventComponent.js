/* eslint-disable react/prop-types */
import { useDataEngine } from '@dhis2/app-runtime'
import { CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    useCreateEvents,
    useEditEvents,
} from '../../hooks/events/useMutateEvents'
import { useGetDataElements } from '../../hooks/events/useGetDataElements'
import { useGetTEIByID } from '../../hooks/tei/useGetTEIByID'
import { organizeDataValues } from '../../utils/commons/organizeDataValues'
import { formatResponseEvents, formatResponseEventsEdit } from '../../utils/events/formatResponseEvents'
import EventFormComponent from './EventForm'
import { formaterToIsoDate } from '../../utils/commons/dateFormatter'
import { programRulesUtilsSection } from '../../utils/programRules/programRulesUtils'
import { useGetProgramRules } from '../../hooks/programRules/useGetProgramRules'
import { useGetProgramRuleVariables } from '../../hooks/programRules/useGetProgramRuleVariables'

const formCreate = (dataValues, orgUnit, programStage, program, tei, enrollment, eventDate) => ({
    events: [
        {
            occurredAt: eventDate,
            status: 'ACTIVE',
            program: program,
            programStage: programStage,
            orgUnit: orgUnit,
            trackedEntityInstance: tei,
            enrollment: enrollment,
            scheduledAt: eventDate,
            dataValues: dataValues,
        },
    ],
})

const formUpdate = (dataValues, orgUnit, programStage, program, tei, event) => ({
    event: event,
    status: 'ACTIVE',
    program: program,
    programStage: programStage,
    orgUnit: orgUnit,
    trackedEntityInstance: tei,
    dataValues: dataValues,
})

const eventsQuery = {
    events: {
        resource: 'events',
        params: ({ programStage, orgUnit, program, tei }) => ({
            orgUnit: orgUnit,
            program: program,
            fields: 'created,orgUnitName,event',
            programStage: programStage,
            trackedEntityInstance: tei,
        }),
    },
}

const activeEventsQuery = {
    events: {
        resource: 'events',
        id: ({ id }) => id,
        params: {
            fields: 'event',
        },
    },
}

function EventComponent(props) {
    // eslint-disable-next-line react/prop-types
    const [searchParams] = useSearchParams()
    const teiID = searchParams.get('tei')
    const selectedOu = searchParams.get('ou')
    const [type, setType] = useState('create')
    const [disable, setDisable] = useState(true)

    const { programStage, programStages, program } = props
    const { loadingPRules, programRules } = useGetProgramRules(program)
    const { loadingPRuleVariables, programRuleVariables, getData } = useGetProgramRuleVariables(program, setDisable)

    const engine = useDataEngine()
    const [activeEvent, setActiveEvent] = useState(null)
    const [events, setEvents] = useState(null)
    const [loadEvents, setLoadEvents] = useState(false)
    const [loadActiveEvents, setLoadActiveEvents] = useState(false)
    const [typeObject, setTypeObject] = useState("programStage")
    const [eventDateLabel, setEventDateLabel] = useState("Data")
    const [dataElements, setDataElements] = useState([])
    const [activeEventData, setActiveEventData] = useState(null)
    const [values, setvalues] = useState({})

    const { data: enrollment, loadingTei } = useGetTEIByID({
        teiID,
        program,
        fields: 'enrollments[enrollment]',
    })

    const { loading: loadingMutate, mutate } = useCreateEvents({
        message: 'Events created successfully',
        onComplete: function (params) {
            fetchEvents()
        },
    })
    const { loading: loadingMutateUpdate, mutateUpdate } = useEditEvents({
        message: 'Events updated successfully',
        onComplete: function (params) {
            fetchEvents()
            setDisable(!disable)
        },
    })

    const getActiveProgramStage = () => {
        return programStages.filter((element) => {
            return element.id === programStage
        })[0]
    }

    const fetchEvents = async () => {
        setLoadEvents(true)
        await engine.query(eventsQuery, {
            variables: {
                programStage: programStage,
                orgUnit: selectedOu,
                program: program,
                tei: teiID,
            },
            onComplete: (response) => {
                if (response.events.events.length) {
                    response.events.events[0].active = 'event-active'
                    setActiveEvent(response.events.events[0].event)
                }
                else {
                    setDisable(false)
                    setType('create')
                    setActiveEventData({ eventDate: formaterToIsoDate(new Date()) })
                }
                if (
                    getActiveProgramStage().repeatable &&
                    response.events.events.length > 0
                ) {
                    response.events.events.push({
                        event: 'newform',
                    })
                }
                setEvents(response.events)
                setLoadEvents(false)
            },
        })
    }

    const fetchActiveEvents = async () => {
        setLoadActiveEvents(true)
        await engine.query(activeEventsQuery, {
            variables: { id: activeEvent },
            onComplete: (response) => {
                setActiveEventData(formatResponseEventsEdit(response.events.dataValues))
                // console.log('eventResponse', response)
                setLoadActiveEvents(false)
            },
        })
    }


    useEffect(() => {
        if (activeEvent != 'newform') {
            setType('update')
            setDisable(true)
            if (activeEvent) {
                fetchActiveEvents()
            }
        } else {
            setDisable(false)
            setType('create')
            setActiveEventData({ eventDate: formaterToIsoDate(new Date()) })
        }
    }, [activeEvent])

    useEffect(() => {
        if (programStages) {
            for (const stage of programStages) {
                if(stage.id=== programStage){
                    setEventDateLabel(stage.executionDateLabel)
                    setDataElements(formatResponseEvents(stage).object)
                    setTypeObject(formatResponseEvents(stage).type)
                }
              } 
        }
    }, [programStage])

    useEffect(() => {
        if (programStage) {
            fetchEvents()
        }
    }, [programStage])
    

    useEffect(() => {
        if (events) {
            for (let i = 0; i < events.length; i++) {
                if (events[i].active) {
                    setActiveEvent(events[i].event)
                }
            }
        }
    }, [events])

    async function createEvent(form) {
        await mutate({
            data: formCreate(
                organizeDataValues(form),
                selectedOu,
                programStage,
                program,
                teiID,
                enrollment && enrollment.enrollments[0].enrollment,
                form['eventDate']
            ),
        })
    }

    async function updateEvent(form) {
        await mutateUpdate({
            eventID: activeEvent,
            data: formUpdate(
                organizeDataValues(form),
                selectedOu,
                programStage,
                program,
                teiID,
                activeEvent
            ),
        })
    }

    if (loadingTei || loadingPRules || loadingPRuleVariables) {
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
            loadActiveEvents={loadActiveEvents}
            loadEvents={loadEvents}
            events={events}
            setData={props.setData}
            variables={typeObject === "programStage" ? dataElements : programRulesUtilsSection(dataElements, values, programRules, programRuleVariables)}
            executionDateLabel={eventDateLabel}
            postEvents={type === 'create' ? createEvent : updateEvent}
            type={type}
            repeatable={getActiveProgramStage().repeatable}
            setEvents={setEvents}
            programStages={programStages}
            loadingMutate={type === 'create' ? loadingMutate : loadingMutateUpdate}
            initialValues={activeEventData}
            disabled={disable}
            setDisable={() => setDisable(!disable)}
            onChange={onChange}
            typeObject={typeObject}
            refetch={getData}
        />
    )
}

export default EventComponent
