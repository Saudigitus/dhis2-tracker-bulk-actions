import React from 'react'
import DateFilterManager from './filterComponents/Date/DateFilterManager';
import SelectBoxes from './filterComponents/OptionSet/SelectBoxes/SelectBoxes';
import TextFilter from './filterComponents/Text/Text'
import TrueOnly from './filterComponents/TrueOnly/TrueOnly';

function FIlterComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { type, column } = props;

    switch (type) {
        case "optionSet":
            return <SelectBoxes {...column} />
        case "DATE":
            return <DateFilterManager {...column} />
        case "TEXT":
            return <TextFilter {...column} />
        case "TRUE_ONLY":
            return <TrueOnly {...column} />
        case "INTEGER_ZERO_OR_POSITIVE": 
            return <TrueOnly {...column} />
        default:
            return <div>not mapped</div>
    }
}

export default FIlterComponent