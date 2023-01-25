import { Label } from "@dhis2/ui";
import React from "react";
import { GenericFields } from "../genericFields";
import WithBorder from "../table/components/WithBorder";
import WithPadding from "../tamplate/WithPadding";
import style from './groupform.module.css';

function GroupForm({ name, fields = [], disabled }) {
    console.log('fields', fields);
    return (
        <WithBorder type={"all"}>
            <WithPadding p={"16px 5px 16px 5px"}>
                <span className={style.textTitlle}>
                    {name}
                </span>
                <WithPadding p={"10px"}>
                    {fields?.filter(x => x.visible === true)?.map((x, i) =>
                        <div className="row d-flex align-items-center" key={i} style={{ display: "flex", padding: "8px 8px 8px 5px", backgroundColor: i % 2 === 0 && "#ebf0f6" }}>
                            <div className="col-12 col-md-6">
                                <Label style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                                    {x.labelName} {x.required && " *"}
                                </Label>
                            </div>
                            <div className="col-12 col-md-6">
                                <GenericFields
                                    attribute={x}
                                    disabled={disabled || x.disabled || x.name === "dIjFDf8XU2p" }
                                />
                            </div>
                        </div>
                    )}
                </WithPadding>
            </WithPadding>
        </WithBorder>
    )
}

export default GroupForm;