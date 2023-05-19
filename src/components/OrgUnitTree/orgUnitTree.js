/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import { useDataEngine } from "@dhis2/app-runtime";
import { CenteredContent, CircularLoader, Help, OrganisationUnitTree } from '@dhis2/ui'
import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from 'react'
import { AppBarContext } from "../../contexts";
import { useParams } from "../../hooks/common/useQueryParams";

const orgUnitQuery = {
    results: {
        resource: "organisationUnits",
        params: ({ query, id }) => ({
            fields: "id,displayName",
            withinUserHierarchy: true,
            // filter: `id:in:${id}`,
            query: query
        })
    }
}

function OrgUnitTree({ selected, onChange, singleSelection = true, initiallyExpanded = true, query }) {

    const engine = useDataEngine();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { setSelectedOu, setInitOu, initOU, myOU } = useContext(AppBarContext)
    const { add, useQuery } = useParams();

    const ou = useQuery().get("ou")
    const ouName = useQuery().get("ouName")

    const fetcher = async () => {
        setLoader(true)
        await engine.query(orgUnitQuery,
            {
                variables: {
                    id: `[${myOU.results.organisationUnits[0].id}]`,
                    query: query
                }
            }
        ).then(result => {
            console.log(result);
            setData(result)
            setLoader(false)
        }).catch(err => {
            setLoader(false)
            setError(err)
        })
    }

    useEffect(() => {
        if (query.length > 0) {
            const delayDebounceFn = setTimeout(() => {
                fetcher()
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        } else {
            setData(myOU)
        }
    }, [query])

    useEffect(() => {
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
    }, [data]);

    if (error) {
        return <Help error>
            Something went wrong when loading the organisation units!
        </Help>
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
                        // name={data?.results.organisationUnits[0].displayName || myOU.results.organisationUnits[0].displayName}
                        roots={data?.results.organisationUnits?.map(x => x.id) || myOU.results.organisationUnits}
                        {...initiallyExpanded && { initiallyExpanded: [data?.results.organisationUnits[0].id || myOU.results.organisationUnits[0].id] }}
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