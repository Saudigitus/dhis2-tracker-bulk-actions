/* eslint-disable react/prop-types */
import { Button, Card, CenteredContent, CircularLoader } from "@dhis2/ui";
import { Box, Divider, Grid } from "@material-ui/core";
import React from "react";
import { formaterToIsoDate } from "../../utils/commons/dateFormatter";
import CardPrgStgCNPA from "../card/CardPrgStgCNPA";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GroupForm from "../form/GroupForm";
import WithPadding from "../tamplate/WithPadding";
import { Form } from "react-final-form";

// eslint-disable-next-line react/prop-types
function EventFormComponent({ variables, postEvents, setData, initialValues, loadingMutate, programStages, type, events, disabled, setDisable, setEvents, loadEvents, loadActiveEvents, repeatable, onChange, executionDateLabel, typeObject, refetch }) {

    const alertValues = values => {
        postEvents(values)
    }

    const changeActiveEvent = (active, eventId) => {
        var updatedStages = events.events
        if (!active) {
            updatedStages.events = []
            for (const event of events.events) {
                if (event?.active) {
                    delete event.active
                }
                if (event.event === eventId) {
                    event.active = "event-active"
                }
                updatedStages.events.push(event)
            }
            setEvents(updatedStages)
        }
    }
    return (
        <Form
            onSubmit={alertValues}
            initialValues={initialValues}
        >
            {({ handleSubmit, values, submitting, pristine, form }) => (
                <form onSubmit={handleSubmit} onChange={onChange(values)}>
                    <Card>
                        <div style={{ fontWeight: 500 }}>
                            <Box sx={{ my: 1, px: 2, py: 2 }}>
                                <div className="row g-4">
                                    {
                                        programStages.map(programStage => (
                                            <div key={programStage.id} className="col-6 col-sm-3 col-lg-3 col-xl-2">
                                                <CardPrgStgCNPA setData={setData} stagesList={programStages} isActive={programStage.active} title={programStage.name} />
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    loadEvents ?
                                        <WithPadding p={"16px"}>
                                            <CenteredContent>
                                                <CircularLoader />
                                            </CenteredContent>
                                        </WithPadding>
                                        :
                                        <div className="row g-1 px-2 mt-2 d-flex align-items-center">
                                            {
                                                events && events.events.map((event, index) => (
                                                    index !== (events.events.length - 1) ?
                                                        <div className="grin-card col-6 col-sm-3 col-lg-3 col-xl-2" key={event.event}>
                                                            <div onClick={() => changeActiveEvent(event.active, event.event)} className={event.active || "events-cards"}>
                                                                <span>{event?.orgUnitName}</span>
                                                                <span>{event?.created && formaterToIsoDate(new Date(event.created))}</span>
                                                            </div>
                                                        </div> :
                                                        repeatable && <div className="grin-card col-6 col-sm-3 col-lg-3 col-xl-2" key={event.event}>
                                                            <div onClick={() => changeActiveEvent(event.active, event.event)} className={event.active || "events-cards"}>
                                                                <AddCircleOutlineIcon style={{ color: 'grey' }} />
                                                            </div>
                                                        </div>
                                                ))
                                            }
                                        </div>
                                }
                            </Box>
                            <Divider />
                        </div>
                        {
                            (loadEvents === false && events) ?
                                loadActiveEvents ?
                                    <CenteredContent>
                                        <WithPadding p={"16px"}>
                                            <CircularLoader />
                                        </WithPadding>
                                    </CenteredContent> :
                                    <WithPadding p={"16px"}>
                                        {type === "create" &&
                                            <GroupForm
                                                name={"Basic Info"}
                                                fields={[{ labelName: executionDateLabel, valueType: "DATE", name: "eventDate", required: true, visible: true }]}
                                            />
                                        }

                                        <WithPadding />
                                        {typeObject === "programStage" ?
                                            <GroupForm
                                                name={"Event Information"}
                                                fields={variables}
                                                disabled={events?.events?.length ? disabled : false}
                                            />
                                            : variables?.filter(x => x.visible === true)?.map((x, i) =>
                                                <div key={i} style={{ marginBottom: 20 }}>
                                                    <GroupForm
                                                        name={x.labelName}
                                                        fields={x.dataElements}
                                                        disabled={events?.events?.length ? disabled : false}
                                                    />
                                                </div>
                                            )}
                                        <WithPadding />
                                        {type === "create" ? (
                                            <>
                                                <Grid container spacing={2} justify="space-between">
                                                    <Grid item>

                                                    </Grid>

                                                    <Grid item>
                                                        <Button
                                                            onClick={form.reset}
                                                            disabled={submitting || pristine}
                                                        >
                                                            Limpar tudo
                                                        </Button>{' '}
                                                        <Button type="submit" primary disabled={loadingMutate || submitting || pristine} loading={loadingMutate} icon={loadingMutate && <CircularLoader small />}>
                                                            Submeter
                                                        </Button>


                                                    </Grid>
                                                </Grid>
                                            </>

                                        ) : (
                                            <Grid container spacing={2} justify="space-between">
                                                <Grid item>

                                                </Grid>

                                                <Grid item>
                                                    <span hidden={!disabled}>
                                                        <Button onClick={setDisable} primary
                                                        //disabled={submitting || pristine}
                                                        >
                                                            Editar
                                                        </Button>
                                                    </span>
                                                    <span hidden={disabled}>
                                                        <Button onClick={refetch} disabled={submitting || pristine}>
                                                            Cancelar
                                                        </Button>{' '}
                                                        <Button type="submit" primary disabled={loadingMutate || submitting || pristine} loading={loadingMutate} icon={loadingMutate && (<CircularLoader small />)}>
                                                            Salvar alterações
                                                        </Button>
                                                    </span>
                                                </Grid>
                                            </Grid>
                                        )}

                                    </WithPadding> : <></>
                        }
                    </Card>
                    {/* </div > */}
                    {/*< div style={{ width: "18.75rem" }} />*/}
                    {/* </div>*/}

                </form>
            )}
        </Form>
    )
}

export default EventFormComponent