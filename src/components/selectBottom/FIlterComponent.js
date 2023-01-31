import React from 'react'
import DateFilterManager from './filterComponents/Date/DateFilterManager';
import SelectBoxes from './filterComponents/OptionSet/SelectBoxes/SelectBoxes';
import TextFilter from './filterComponents/Text/Text'

function FIlterComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { type, column } = props;

    console.log(type);

    switch (type) {
        case "optionSet":
            return <SelectBoxes {...column} />
        case "DATE":
            return <DateFilterManager {...column} />
        case "TEXT":
            return <TextFilter {...column} />
        default:
            return <div>default</div>
    }
}

export default FIlterComponent