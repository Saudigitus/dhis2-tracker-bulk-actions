// @flow

import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';


const getStyles = () => ({
    fromToContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    inputContainer: {},
    toLabelContainer: {
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
    },
    logicErrorContainer: {
        paddingTop: 10,
    },
});

const DateFilterManager = (props) => {
    const [value, setvalue] = useState(0)

    const handleDateChange = (value) => {
        setvalue(value)
    };

    const { header, classes } = props;

    return (
        // $FlowFixMe[cannot-spread-inexact] automated comment
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={classes.fromToContainer}>
                <div className={classes.inputContainer}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        style={{ width: 170 }}
                        label={"From"}
                        value={value}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </div>
                <div className={classes.toLabelContainer}/>
                <div className={classes.inputContainer}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        style={{ width: 170 }}
                        label={"To"}
                        value={value}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </div>
            </div>
        </MuiPickersUtilsProvider>

    );
}

export default withStyles(getStyles)(DateFilterManager);