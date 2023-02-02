
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
    const [resetValues, setresetValues] = useState("")
    const [localEnrollmentDate, setlocalEnrollmentDate] = useState({})
    const { enrollmentDate, setEnrollmentDate, setattributeFilters } = useContext(GeneratedVaribles);

    var queryBuilder = [];

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
        // console.log(value, key, type, pos);
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
        const copyHeader = { ...filtersValues }
        for (const [key, value] of Object.entries(copyHeader)) {
            console.log(value);
            if (typeof value === 'object') {
                queryBuilder.push([`${key}:ge:${value.startDate}:le:${value.endDate}`])
            } else {
                queryBuilder.push([`${key}:like:${value}`])
            }
        }
        setFilters(copyHeader)
        setFilter(queryBuilder)
    }

    const onChangeEnrollmentDate = (date, key, type, pos) => {
        const localDate = { ...localEnrollmentDate }
        if (pos === 'start') {
            localDate["startDate"] = format(date, "yyyy-MM-dd")
        } else {
            localDate["endDate"] = format(date, "yyyy-MM-dd")
        }
        setlocalEnrollmentDate(localDate);
    }

    const onResetFilters = (id) => {
        const copyHeader = { ...filtersValues }
        const copyFilter = { ...filters }
        delete copyHeader[id]
        delete copyFilter[id]
        setfiltersValues(copyHeader)
        setFilters(copyFilter)
        setresetValues(id)
    }

    const onResetFiltersEnrollmentDate = () => {
        let resetValues = { ...localEnrollmentDate }
        let resetValues2 = { ...enrollmentDate }

        resetValues = {}
        resetValues2 = {}
        setlocalEnrollmentDate(resetValues)
        setEnrollmentDate(resetValues2)
    }

    useEffect(() => {
        if (resetValues.length > 0) {
            onQuerySubmit()
            setresetValues("")
        }
    }, [resetValues])

    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
            <SelectBottom title={"Enrollment date"}
                colum={{
                    header: "Enrollment date",
                    valueType: "DATE",
                    id: "enrollmentDate"
                }}
                disableb={Object.keys(enrollmentDate).length > 0 ? enrollmentDate.startDate === localEnrollmentDate.startDate && enrollmentDate.endDate === localEnrollmentDate.endDate : Object.keys(localEnrollmentDate).length > 0 && Object.keys(localEnrollmentDate).length > 0 ? false : true}
                onQuerySubmit={() => setEnrollmentDate(localEnrollmentDate)}
                onChange={onChangeEnrollmentDate}
                value={localEnrollmentDate}
                disabledReset={!localEnrollmentDate}
                filled={Object.keys(enrollmentDate || {}).length > 0 && `${enrollmentDate?.startDate && enrollmentDate?.startDate}${(enrollmentDate?.endDate) && "- " + enrollmentDate?.endDate}`}
                onResetFilters={onResetFiltersEnrollmentDate}
            />
            {
                localFilters.map((colums, index) => (
                    <SelectBottom key={index}
                        title={colums.header}
                        value={filtersValues[colums.id]}
                        colum={colums}
                        onQuerySubmit={onQuerySubmit}
                        onChange={onChangeFilters}
                        disabledReset={!filtersValues[colums.id]}
                        disableb={colums.valueType === "DATE" ?
                            filters.hasOwnProperty(colums.id) ? filters[colums.id].startDate === filtersValues[colums.id].startDate && filters[colums.id].endDate === filtersValues[colums.id].endDate : filtersValues.hasOwnProperty(colums.id) && Object.keys(filtersValues[colums.id]).length > 0 ? false : true
                            :
                            filters[colums.id] === filtersValues[colums.id]
                        }
                        filled={colums.valueType === "DATE" ?
                            Object.keys(filters[colums.id] || {}).length > 0 && `${filters[colums.id]?.startDate && filters[colums.id]?.startDate}${(filters[colums.id]?.endDate) && "- " + filters[colums.id]?.endDate}`
                            :
                            filters[colums.id] && filters[colums.id]
                        }
                        onResetFilters={onResetFilters}
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