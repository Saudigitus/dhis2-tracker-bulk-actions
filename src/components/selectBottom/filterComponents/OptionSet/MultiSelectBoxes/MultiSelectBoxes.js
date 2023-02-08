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

let checkedValues = "";
function MultiSelectBoxes(props) {
    const { optionSets, classes, id, onChange, value = "", valueType } = props;

    const handleOptionChange = (e) => {
        checkedValues = value;
        if (e.checked) {
            checkedValues = checkedValues + e.value + ";"
        } else {
            checkedValues = checkedValues.replace(e.value + ";", "")
        }
        onChange(checkedValues, id, valueType)
        checkedValues = ""
    }

    const isChecked = (localValue) => {
        return !!(value && value.includes(localValue));
    }

    // console.log(props, checkedValues);
    return optionSets.map(({ text, code: value, displayName: header }, index) => (
        <Checkbox
            key={index}
            checked={isChecked(value)}
            label={header}
            name={`multiSelectBoxes-${index}`}
            onChange={(e) => { handleOptionChange(e); }}
            value={value}
            className={classes.checkbox}
            dense
        />
    ));
}

export default withStyles(styles)(MultiSelectBoxes)