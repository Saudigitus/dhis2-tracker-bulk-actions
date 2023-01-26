/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import { CenteredContent, CircularLoader, Help, OrganisationUnitTree } from '@dhis2/ui'
import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from 'react'
import { AppBarContext } from "../../contexts";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles";
import { useParams } from "../../hooks/common/useQueryParams";

function OrgUnitTree({ selected, onChange, singleSelection = true, initiallyExpanded = true, query }) {

    const { userOrgUnit = { error: "", data: "" } } = useContext(GeneratedVaribles)

    if (userOrgUnit?.error) {
        return <Help error>
            Something went wrong when loading the organisation units!
        </Help>
    }

    if (userOrgUnit?.data?.results?.organisationUnits?.length === 0) {
        return (
            <CenteredContent>
                <Help error>
                    Você não tem nenhuma unidade Organizacional associada a você
                </Help>
            </CenteredContent>
        )
    }

    return (
        <div>
            {
                userOrgUnit?.data?.results?.organisationUnits?.length > 0 ?
                    <OrganisationUnitTree
                        // name={data?.results.organisationUnits[0].displayName}
                        roots={userOrgUnit?.data?.results.organisationUnits.map(ou => ou.id)}
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