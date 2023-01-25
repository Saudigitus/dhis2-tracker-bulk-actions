export const getValueType = (valueType) =>{
    switch (valueType) {
        case 'BOOLEAN':
            return 'BOOLEAN'

        case 'NUMBER':
            return 'number'

        case 'PHONE_NUMBER':
            return 'text'

        case 'TEXT':
            return 'text'

        case 'LONG_TEXT':
            return 'text'

        case 'INTEGER':
            return 'number'

        case 'INTEGER_POSITIVE':
            return 'number'

        case 'INTEGER_ZERO_OR_POSITIVE':
            return 'number'

        case 'DATE':
            return 'date'

        case 'TIME':
            return 'time'

        default:
            return "text"
    }
}