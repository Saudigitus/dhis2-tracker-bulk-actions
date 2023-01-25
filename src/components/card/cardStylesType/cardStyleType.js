export function getTypesCards(props) {
    const possibleTypes = ['success', 'error','warning']
    for (const type of possibleTypes) {
        // eslint-disable-next-line no-prototype-builtins
        if (props.hasOwnProperty(type)) {
            return type
        }
    }
}