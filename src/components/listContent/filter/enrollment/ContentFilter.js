
import { Input } from '@dhis2/ui';
import { Button, FormControl, IconButton, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useContext, useEffect } from 'react';
import { AppBarContext } from '../../../../contexts/AppBarContext'
import { GeneratedVaribles } from '../../../../contexts/GeneratedVaribles';
import { getValueType } from '../../../../utils/commons/getValueType';
import MenuFilters from './MenuFilters';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
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
    var queryBuilder = "";

    useEffect(() => {
        const copyHeader = [...headers]
        setlocalFilters(copyHeader.slice(0, 4))
    }, [headers])

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

    const onChangeFilters = (event, key) => {
        // console.log(event?.target?.value);
        if (event?.target?.value != null) {
            const copyHeader = { ...filters }
            copyHeader[key] = event?.target?.value
            setfiltersValues(copyHeader);
        } else {
            delete filters[key]
        }
    }

    const onQuerySubmit = () => {
        // for (const [key, value] of Object.entries(filters)) {
        //     queryBuilder += `${key}:LIKE:${value},`
        // }

        setFilter(queryBuilder)
    }
    // console.log(filtersValues);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
            <SelectBottom title={"Enrollment status"} value={value["enrollmentStatus"]} setvalue={setvalue} colum={{
                header: "Enrollment status",
                optionSets: [{ code: "ACTIVE", displayName: "Active" }, { code: "COMPLETED", displayName: "Completed" }, { code: "CANCELLED", displayName: "Cancelled" }],
                valueType: "optionSet",
                id: "enrollmentStatus"
            }} />
            <SelectBottom title={"Enrollment date"} value={value["enrollmentDate"]} setvalue={setvalue} colum={{
                header: "Enrollment date",
                valueType: "date",
                id: "enrollmentDate"
            }} />
            {
                localFilters.map((colums, index) => (
                    <SelectBottom key={index} title={colums.header} value={value[colums.header]} setvalue={setvalue} colum={colums} />
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