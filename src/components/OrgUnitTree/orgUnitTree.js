/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import { useDataEngine } from "@dhis2/app-runtime";
import { CenteredContent, CircularLoader, Help, OrganisationUnitTree } from '@dhis2/ui'
import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from 'react'
import { AppBarContext } from "../../contexts";
import { useParams } from "../../hooks/common/useQueryParams";

// const orgUnitQuery = {
//     results: {
//         resource: "organisationUnits",
//         params: ({ query, id }) => ({
//             fields: "id,displayName",
//             withinUserHierarchy: true,
//             filter: `id:in:${id}`,
//             query: query
//         })
//     }
// }


const me = {
    results: {
        resource: "me",
        params: {
            fields: "organisationUnits[id,displayName]",
        }
    }
}

function OrgUnitTree({ selected, onChange, singleSelection = true, initiallyExpanded = true, query }) {

    const engine = useDataEngine();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [notOuAlert, setNotOuAlert] = useState(false);
    const { setSelectedOu, setInitOu, initOU } = useContext(AppBarContext)
    const { add, useQuery } = useParams();

    const ou = useQuery().get("ou")
    const ouName = useQuery().get("ouName")
    const fetcher = async () => {
        setLoader(true)
        await engine.query(me)
            .then(response => {
                if (response.results.organisationUnits.length == 0) {
                    setNotOuAlert(true)
                }
                setData(response)
                setLoader(false)
                // engine.query(orgUnitQuery,
                //     {
                //         variables: {
                //             id: `[${response.results.organisationUnits[0].id}]`,
                //             query: query
                //         }
                //     }
                // ).then(result => {
                //     setLoader(false)
                // }).catch(err => {
                //     setLoader(false)
                //     setError(err)
                // })
            }).catch(error => {
                setError(error)
            })
    }

    useEffect(() => {
        fetcher()
    }, [query])

    useEffect(() => {
        if (!error && !notOuAlert) {
            if (data && ou) {
                setSelectedOu({
                    id: ou,
                    selected: ou,
                    displayName: ouName,
                })
            } else
                if (data && !initOU) {
                    setSelectedOu({
                        id: data.results.organisationUnits[0].id,
                        selected: data.results.organisationUnits[0].id,
                        displayName: data.results.organisationUnits[0].displayName,
                    })

                    add("ou", data.results.organisationUnits[0].id)
                    add("ouName", data.results.organisationUnits[0].displayName)
                    setInitOu(true)
                }
        }

    }, [data]);



    if (error) {
        return <Help error>
            Something went wrong when loading the organisation units!
        </Help>
    }

    if (notOuAlert) {
        return (
            <CenteredContent>
                <Help error>
                    Você não tem nenhuma unidade Organizacional associada a você
                </Help>
            </CenteredContent>
        )
    }

    if (loader || data === null) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    return (
        <div>
            {
                data.results.organisationUnits.length > 0 ?
                    <OrganisationUnitTree
                        // name={data?.results.organisationUnits[0].displayName}
                        roots={data?.results.organisationUnits.map(ou => ou.id)}
                        // {...initiallyExpanded && { initiallyExpanded: [data?.results.organisationUnits[0].id] }}
                        singleSelection={singleSelection}
                        onChange={onChange}
                        selected={selected?.selected}
                    /> : <span>No org unit found</span>
            }
        </div>
    )
}

OrgUnitTree.propTypes = {
    selected: PropTypes.object.isRequired,
    onChange: PropTypes.object.isRequired,
    initiallyExpanded: PropTypes.bool,
    singleSelection: PropTypes.bool,
}

export default OrgUnitTree