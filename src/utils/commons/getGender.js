const getGender = (gender) => {
    if (gender==="M") return "Masculino";
    if (gender==="F") return "Feminino";
    return "---";
}

export { getGender }
