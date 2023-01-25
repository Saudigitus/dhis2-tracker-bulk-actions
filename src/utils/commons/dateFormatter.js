import dateFormat from 'dateformat'

const formaterToIsoDate = (date) => {
    return dateFormat(date,'yyyy-mm-dd');
}

export {formaterToIsoDate}