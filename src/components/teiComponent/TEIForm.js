import { Button, Card, CircularLoader } from "@dhis2/ui";
import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { Form } from "react-final-form";
import { useSearchParams } from "react-router-dom";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles";
import { formaterToIsoDate } from "../../utils/commons/dateFormatter";
import GroupForm from "../form/GroupForm";
import WithPadding from "../tamplate/WithPadding";

function getProcessType() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchParams] = useSearchParams()
    const processType = searchParams.get("processType")
    return processType;
}


function getAutoGenerated() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { autoGenerated } = useContext(GeneratedVaribles)

    return autoGenerated
}

// eslint-disable-next-line react/prop-types
function TEIFormComponent({ variables, typeView, createEnrollment, type, loadingMutate, initialValues = { enrollmentDate: formaterToIsoDate(new Date()), dIjFDf8XU2p: getProcessType(), ...getAutoGenerated() }, disabled, setDisable, enrollmentDate, refetch }) {
    const alertValues = values => {
        // setform(formattedValuesString)
        createEnrollment(values)
    }
    return (
        <Form
            onSubmit={alertValues}
            initialValues={initialValues}
        >
            {({ handleSubmit, reset, values, submitting, pristine, form }) => (
                <form onSubmit={(event) => handleSubmit(event)}>
                    <Card>
                        <Grid container spacing={2} justify="space-between" style={{ padding: "16px 16px 5px 16px" }} hidden={type === "edit"}>
                            <Grid item>
                                <div style={{ fontWeight: 500 }}>
                                    {typeView}
                                </div>
                            </Grid>

                            <Grid item>

                            </Grid>
                        </Grid>

                        <WithPadding p={"16px"}>
                            {type === "save" &&
                                <>
                                    <GroupForm
                                        name={"Enrollment Date"}
                                        fields={[{ labelName: enrollmentDate, valueType: "DATE", name: "enrollmentDate", required: true, visible: true }]}
                                    />
                                    <WithPadding />
                                </>
                            }
                            <GroupForm
                                name={"Profile"}
                                fields={variables}
                                disabled={disabled}
                            />
                            <WithPadding />

                            {type === "save" ? (
                                <Grid container spacing={2} justify="space-between">
                                    <Grid item></Grid>
                                    <Grid item>
                                        {/* <Button onClick={form.reset} disabled={submitting || pristine}>
                                            Reset
                                        </Button>{' '} */}

                                        <Button type="submit" primary disabled={loadingMutate || submitting} loading={loadingMutate} icon={loadingMutate && <CircularLoader small />}>
                                            Submeter
                                        </Button>
                                    </Grid>
                                </Grid>
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
                                        <div hidden={disabled}>
                                            <Button onClick={refetch} disabled={submitting || pristine}>
                                                Cancelar
                                            </Button>{' '}
                                            <Button type="submit" primary disabled={loadingMutate || submitting || pristine} loading={loadingMutate} icon={loadingMutate && (<CircularLoader small />)}>
                                                Salvar alterações
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            )}


                        </WithPadding>
                    </Card>
                    <WithPadding />
                </form>
            )
            }
        </Form >
    )
}

export default TEIFormComponent