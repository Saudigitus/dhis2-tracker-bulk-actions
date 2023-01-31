import { Checkbox, spacersNum } from '@dhis2/ui';
import { withStyles } from '@material-ui/core';
import React from 'react'


const styles = theme => ({
    label: theme.typography.formFieldTitle,
    checkbox: {
        marginTop: spacersNum.dp8,
        marginBottom: spacersNum.dp16,
    },
});

function MultiSelectBoxes(props) {
    const { optionSets, classes } = props;


    return optionSets.map(({ text, code: value, displayName: header }, index) => (
        <Checkbox
            key={index}
            checked={false}
            label={header}
            name={`multiSelectBoxes-${index}`}
            // onChange={(e) => { this.handleOptionChange(e, value); }}
            value={value}
            className={classes.checkbox}
            dense
        />
    ));
}

export default withStyles(styles)(MultiSelectBoxes)