function attributeFilter(array, attribute) {
    return array.filter(element => {
        return element?.attribute === attribute
    })[0]?.value
}

export {attributeFilter}