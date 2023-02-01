import React from 'react'
import DateFilterManager from './filterComponents/Date/DateFilterManager';
import SelectBoxes from './filterComponents/OptionSet/SelectBoxes/SelectBoxes';
import TextFilter from './filterComponents/Text/Text'
import TrueOnly from './filterComponents/TrueOnly/TrueOnly';

function FIlterComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { type, column, onChange, value } = props;
    

    switch (type) {
        case "optionSet":
            return <SelectBoxes {...column}
                onChange={onChange}
            />
        case "DATE":
            return <DateFilterManager
                onChange={onChange}
                value={value}
                {...column}
            />
        case "TEXT":
            return <TextFilter
                onChange={onChange}
                value={value}
                {...column}
            />
        case "TRUE_ONLY":
            return <TrueOnly
                onChange={onChange}
                value={value}
                {...column}
            />
        case "INTEGER_ZERO_OR_POSITIVE":
            return <TrueOnly
                onChange={onChange}
                value={value}
                {...column}
            />
        default:
            return <div>not mapped</div>
    }
}

export default FIlterComponent