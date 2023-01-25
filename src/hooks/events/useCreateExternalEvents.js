
// eslint-disable-next-line import/extensions
import { useConfig, useDataEngine, useDataMutation } from "@dhis2/app-runtime";
import { AlertBar } from "@dhis2/ui";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { externalRequest } from "../../api/requests.js";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles.js";
import useShowAlerts from "../common/useShowAlerts.js"

function formatBeforeSend(data, config) {
    return {
        "endpoint": `${config.baseUrlB}/api/events.json`,
        "data": {
            "events": [
                data
            ]
        }
    }
}

export const useCreateExternalEvents = (body) => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { baseUrl } = useConfig()

    const [data, setdata] = useState("")
    const [loading, setloading] = useState(false)
    const { showPopUpNotification } = useShowAlerts()
    const { externalUser, externalBaseUrl, setreloadData } = useContext(GeneratedVaribles)
    const [postData, setpostData] = useState(false)

    useEffect(() => {
        if (postData) {
            setloading(true)
            create()
        }
    }, [postData])

    const create = async () => {
        // console.log({ resouce: "events", id: body.event, params: { fields: "*" } });
        const newBody = await engine.query({ response: { resource: "events", id: ({ id }) => id, params: { fields: "*" } } }, { variables: { id: body.event } })

        await externalRequest.postEvent(formatBeforeSend(newBody.response, externalBaseUrl), externalBaseUrl).then(response => {
            setdata(response)
            setloading(false)
            setpostData(false)

            engine.mutate({
                resource: `events/${body.event}`,
                id: ({ id }) => id,
                data: ({ valor }) => valor,
                type: "update",
            },
                {
                    variables: {
                        id: "u7dfk89C9X7",
                        valor: {
                            event: body.event,
                            program: "BDbg3oehQRj",
                            dataValues: [{
                                dataElement: "u7dfk89C9X7",
                                value: "true"
                            }]
                        }
                    },
                    onComplete: () => {
                        setreloadData(true)
                    }
                }
            )


            showPopUpNotification("Dados enviados para investigação", "success", [{
                label: 'Abrir no módulo de investigação',
                onClick: () => { window.open(`${externalBaseUrl.baseUrlB}/api/apps/Mdulo-de-Investigao---B/index.html#/details?program=BDbg3oehQRj&event=${body.event}`, "_blank") }
            }])

        }).catch(err => {
            showPopUpNotification(err.response.data?.response?.importSummaries?.[0]?.description || err?.data?.message || err?.message, "error")
            setloading(false)
            setpostData(false)
        })
    }

    return {
        loading,
        data,
        setpostData
    }
}