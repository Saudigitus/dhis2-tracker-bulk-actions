
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
    var queryBuilder = "";

    useEffect(() => {
        const copyHeader = [...headers]
        setlocalFilters(copyHeader.slice(0, 4))
    }, [headers])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const addSearchableHeaders = (e) => {
        console.log(e);
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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
            {
                localFilters.map((colums, index) => (
                    colums.valueType === "List" ?
                        <div key={index} style={{ margin: "0 5px" }}>
                            <small style={{ fontSize: 9 }}>{" "} <br /> </small>
                            <FormControl variant="outlined" size="small" className={classes.formControl} style={{ marginTop: -18 }}>
                                <InputLabel id="demo-simple-select-label">{colums.header}</InputLabel>
                                <Select
                                    style={{ width: 200 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filtersValues[colums?.id]}
                                    onChange={(e) => {
                                        onChangeFilters(e, colums.id);
                                        setfiltersValues(prevState => ({ ...prevState, [colums.id]: e?.target?.value }))
                                    }}
                                    className="mr-1 filter-input-select"
                                    placeholder={colums.header} key={index}
                                >
                                    {colums.optionSets.map((x, li) => <MenuItem key={li} value={x.code}>{x.displayName}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        : colums.valueType === "DATE" ?
                            <div style={{ margin: "0 5px" }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker
                                        style={{ width: 200, marginTop: 7 }}
                                        variant="inline"
                                        inputVariant="outlined"
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label={colums.header}
                                        value={filtersValues[colums?.id] && format(filtersValues[colums?.id], "yyyy/MM/dd")}
                                        onChange={(e) => onChangeFilters({ target: { value: e } }, colums.id)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        size="small"
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            :
                            <div key={index} style={{ margin: "0 5px" }}>
                                <TextField small
                                    style={{ width: 200 }}
                                    value={filtersValues[colums?.id] || ""}
                                    key={index}
                                    name={colums.id}
                                    onChange={(e) => onChangeFilters(e, colums.id)}
                                    className="mr-1 filter-input"
                                    valueType={getValueType(colums.valueType)}
                                    type={getValueType(colums.valueType)}
                                    label={colums.header}
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
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

            <IconButton onClick={onQuerySubmit} value="default" className='mt-0'>
                <SearchIcon />
            </IconButton>

        </div >
    )
}

export default ContentFilter