const getAge = (dateString) => {
    var today = new Date()
    var birthDate = new Date(dateString)
    var years = today.getFullYear() - birthDate.getFullYear()
    var months = today.getMonth() - birthDate.getMonth()
    months = years * 12 + months

    if (years < 0) return '--'

    if (years < 1) {
        return `${months} meses`
    } else {
        return `${years} anos`
    }
}

export { getAge }
