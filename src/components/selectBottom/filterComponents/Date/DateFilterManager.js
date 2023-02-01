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
        paddingTop: 0,
    },
    logicErrorContainer: {
        paddingTop: 0,
    },
});

const DateFilterManager = (props) => {
    const { classes, onChange, value } = props;

    return (
        // $FlowFixMe[cannot-spread-inexact] automated comment
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={classes.fromToContainer}>
                <div className={classes.inputContainer}>
                    <KeyboardDatePicker
                        // disableToolbar
                        variant="inline"
                        format="yyyy/MM/dd"
                        style={{ width: 150 }}
                        label={"From"}
                        maxDate={value?.endDate}
                        value={value?.startDate}
                        onChange={(e) => onChange(e, "start")}
                    />
                </div>
                <div className={classes.toLabelContainer} />
                <div className={classes.inputContainer}>
                    <KeyboardDatePicker
                        // disableToolbar
                        variant="inline"
                        format="yyyy/MM/dd"
                        style={{ width: 150 }}
                        minDate={value?.startDate}
                        label={"To"}
                        value={value?.endDate}
                        onChange={(e) => onChange(e, "endDate")}
                    />
                </div>
            </div>
        </MuiPickersUtilsProvider>

    );
}

export default withStyles(getStyles)(DateFilterManager);