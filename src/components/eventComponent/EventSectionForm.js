import { Button, Card, CircularLoader } from "@dhis2/ui";
import { ReactFinalForm } from '@dhis2/ui'
import React from "react";
// import { getallInitVariables } from "../../utils/events/getallInitVariables";
import GroupForm from "../form/GroupForm";
import WithPadding from "../tamplate/WithPadding";
// eslint-disable-next-line react/prop-types
function EventSectionFormComponent({ variables, postEvents, typeView, initialValues = { eventDate: '2022-10-05' }, loadingMutate, type, onChange, executionDateLabel }) {

    const alertValues = values => {
        postEvents(values)
    }

    return (
        <ReactFinalForm.Form
            onSubmit={alertValues}
            initialValues={{ ...initialValues }}
        >
            {({ handleSubmit, values, submitting, pristine, form }) => (
                <form onSubmit={handleSubmit} onChange={onChange(values)}>
                    {/* <div style={{display: "flex",flexWrap: "wrap", boxSizing: "border-box",     justifyContent: "space-between" }}>*/}
                    {/*   <div style={{ flexGrow: 1, maxWidth: "55.75rem", flexBasis: 0 }}>*/}
                    <Card>

                        <div style={{ padding: "16px 0px 5px 16px", fontWeight: 500 }}>
                            {typeView}
                        </div>

                        <WithPadding p={"16px"}>
                            {type === "save" &&
                                <>
                                    <GroupForm
                                        name={"Basic Info"}
                                        fields={[{ labelName: executionDateLabel, valueType: "DATE", name: "eventDate", required: true, visible: true }]}
                                    />
                                    <WithPadding />
                                </>
                            }
                            {
                                variables?.filter(x => x.visible === true)?.map((x, i) =>
                                    <div key={i} style={{ marginBottom: 20 }}>
                                        <GroupForm
                                            name={x.labelName}
                                            fields={x.dataElements}
                                        />
                                    </div>
                                )
                            }

                        </WithPadding>
                    </Card>
                    <WithPadding />
                    <Button type="submit" primary disabled={loadingMutate || submitting || pristine} loading={loadingMutate} icon={loadingMutate && <CircularLoader small />}>
                        Submeter
                    </Button>
                    {' '}
                    <Button
                        onClick={form.reset}
                        disabled={submitting || pristine}
                    >
                        Reset
                    </Button>
                </form>
            )}
        </ReactFinalForm.Form>
    )
}

export default EventSectionFormComponent;