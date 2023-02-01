
import { Input } from '@dhis2/ui';
import { Button, FormControl, IconButton, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useContext, useEffect } from 'react';
import { AppBarContext } from '../../../../contexts/AppBarContext'
import { GeneratedVaribles } from '../../../../contexts/GeneratedVaribles';
import { getValueType } from '../../../../utils/commons/getValueType';
import MenuFilters from './MenuFilters';
import { format } from 'date-fns';
import SelectBottom from '../../../selectBottom/SelectBottom.js'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function ContentFilter({ headers, type }) {
    const classes = useStyles();
    const [filters, setFilters] = useState({});
    const { setFilter } = useContext(AppBarContext);
    const { allOptionSets } = useContext(GeneratedVaribles)
    const [filtersValues, setfiltersValues] = useState({})
    const [localFilters, setlocalFilters] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [value, setvalue] = useState({})
    const { enrollmentDate, setEnrollmentDate, setattributeFilters } = useContext(GeneratedVaribles);

    var queryBuilder = "";

    useEffect(() => {
        const copyHeader = [...headers]
        setlocalFilters(copyHeader.slice(0, 4))
    }
        , [headers])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const addSearchableHeaders = (e) => {
        // console.log(e);
        const copyHeader = [...headers]
        const copyHeaderLocal = [...localFilters]

        let pos = copyHeader.findIndex(x => x.id === e.id)
        copyHeaderLocal.push(copyHeader[pos])
        setlocalFilters(copyHeaderLocal)
    }

    const onChangeFilters = (value, key, type, pos) => {
        console.log(value, key, type, pos);
        const copyHeader = { ...filtersValues }
        if (type === 'DATE') {
            const date = copyHeader[key] || {}
            if (pos === 'start') {
                verifyIsFilled(value) ? date["startDate"] = format(value, "yyyy-MM-dd") : delete date["startDate"]
            } else {
                verifyIsFilled(value) ? date["endDate"] = format(value, "yyyy-MM-dd") : delete date["endDate"]
            }
            copyHeader[key] = date
        } else { verifyIsFilled(value) ? copyHeader[key] = value : delete copyHeader[key] }
        
        setfiltersValues(copyHeader);
    }

    function verifyIsFilled(value) {
        if (value != null) {
            return true
        } else if (value === "") {
            return false
        }
    }

    const onQuerySubmit = () => {
        for (const [key, value] of Object.entries(filters)) {
            queryBuilder += `${key}:LIKE:${value},`
        }

        setFilter(queryBuilder)
    }

    const onChangeEnrollmentDate = (date, key, type, pos) => {
        const localDate = { ...enrollmentDate }
        if (pos === 'start') {
            localDate["startDate"] = format(date, "yyyy-MM-dd")
        } else {
            localDate["endDate"] = format(date, "yyyy-MM-dd")
        }
        setEnrollmentDate(localDate);
    }

    // console.log(filtersValues);

    // <SelectBottom title={"Enrollment status"} value={value["enrollmentStatus"]} setvalue={setvalue} colum={{
    //     header: "Enrollment status",
    //     optionSets: [{ code: "ACTIVE", displayName: "Active" }, { code: "COMPLETED", displayName: "Completed" }, { code: "CANCELLED", displayName: "Cancelled" }],
    //     valueType: "optionSet",
    //     id: "enrollmentStatus",
    //     singleSelect: true
    // }} />

    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
            <SelectBottom title={"Enrollment date"}
                colum={{
                    header: "Enrollment date",
                    valueType: "DATE",
                    id: "enrollmentDate"
                }}
                onChange={onChangeEnrollmentDate}
                value={enrollmentDate}
                filled={Object.keys(enrollmentDate).length > 0 && `${enrollmentDate.startDate && enrollmentDate.startDate}${(enrollmentDate.endDate) && "- " + enrollmentDate.endDate}`}
            />
            {
                localFilters.map((colums, index) => (
                    <SelectBottom key={index}
                        title={colums.header}
                        value={filtersValues[colums.id]}
                        colum={colums}
                        onChange={onChangeFilters}
                        filled={colums.valueType === "DATE" ?
                            Object.keys(filtersValues[colums.id] || {}).length > 0 && `${filtersValues[colums.id]?.startDate && filtersValues[colums.id]?.startDate}${(filtersValues[colums.id]?.endDate) && "- " + filtersValues[colums.id]?.endDate}`
                            :
                            filtersValues[colums.id] && filtersValues[colums.id]}
                    />
                ))
            }
            <div style={{ marginTop: 0 }}>
                {headers.filter(x => !localFilters.includes(x)).length > 0 &&
                    <Button style={{
                        color: "rgb(33, 41, 52)",
                        fontSize: 14,
                        textTransform: "none",
                        fontWeight: 400,
                    }}

                        variant='outlined'
                        onClick={handleClick}
                    >
                        More Filters
                    </Button>
                }
                <MenuFilters
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    options={headers.filter(x => !localFilters.includes(x))}
                    addSearchableHeaders={addSearchableHeaders}
                />
            </div>

        </div>
    )
}

export default ContentFilter