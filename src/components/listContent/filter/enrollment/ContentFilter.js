/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
import { Button, Input, SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import React, { useState, useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { AppBarContext } from '../../../../contexts/AppBarContext'
import ClearIcon from '@material-ui/icons/Clear';
import { Divider, IconButton } from '@material-ui/core';
import { GeneratedVaribles } from '../../../../contexts/GeneratedVaribles';
import { getValueType } from '../../../../utils/commons/getValueType';
import Select from 'react-select';

function ContentFilter({ headers, type }) {

    const [filters, setFilters] = useState({});
    const { setFilter } = useContext(AppBarContext);
    const { allOptionSets } = useContext(GeneratedVaribles)
    const [filtersValues, setfiltersValues] = useState({})
    var queryBuilder = "lSFnAhv8F9u:in:Obito,";


    const fiterSearchableHeaders = () => {
        return headers.filter(element => {
            if (type === "WITH_REGISTRATION") {
                return element.searchable === true & element.visible === true;
            } else if (type === "WITHOUT_REGISTRATION") {
                return element.visible === true;
            }

        })
    }

    //var visibles = headers.map(value => value.visible);
    const allHidden = headers.every(v => v.visible === false && v.visible === headers[0].visible)

    const onChangeFilters = (event, key) => {
        console.log(event, key);
        if (event?.value != null) {
            setFilters(prevState => ({
                ...prevState,
                [key]: event?.value || event?.selected
            }));
        }
        delete filters[key]

    }

    const onQuerySubmit = () => {
        for (const [key, value] of Object.entries(filters)) {
            queryBuilder += `${key}:LIKE:${value},`
        }

        setFilter(queryBuilder.slice(0, -1))
    }


    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
            {
                fiterSearchableHeaders().map((colums, index) => (
                    colums.valueType === "List" ?
                        <div>
                            <small style={{ fontSize: 9 }}>{" "} <br /> </small>
                            {console.log(filtersValues[colums?.id])}
                            <Select
                                isClearable={true}
                                // value={filtersValues[colums?.id]}
                                options={allOptionSets[colums?.optionSet].map(x => { return { value: x.code, label: x.displayName } })}
                                onChange={(e) => {
                                    onChangeFilters(e, colums.id);
                                    setfiltersValues(prevState => ({ ...prevState, [colums.id]: e?.value }))
                                }}
                                className="mr-1 filter-input-select"
                                placeholder={colums.header} key={index}
                            />
                        </div>
                        :
                        <div>
                            {colums.valueType === "DATE" || colums.valueType === "TIME" ? <small style={{ fontSize: 11 }}>{colums.header} </small> : <br />}
                            <Input value={filters[colums?.id] || ""} key={index} name={colums.id} onChange={(e) => onChangeFilters(e)} className="mr-1 filter-input" valueType={getValueType(colums.valueType)} type={getValueType(colums.valueType)} placeholder={colums.header} />
                        </div>
                ))
            }

            {/* {colums.valueType === 'DATE' && <DateInput value={filters[colums?.id] || ""} key={index} name={colums.id} onChange={(e) => onChangeFilters(e)} className="mr-1 filter-input" valueType={colums.valueType} placeholder={colums.header} />} */}
            {
                !allHidden &&
                <>
                    <IconButton onClick={onQuerySubmit} value="default" className='mt-3'>
                        <SearchIcon />
                    </IconButton>
                </>
            }
        </div >
    )
}

export default ContentFilter