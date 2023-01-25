import { useState, useContext } from "react";
import { TypeOfProgramSelected } from "../contexts/TypeOfProgramSelected.js";

const useProgram = () => {
    const { program, type } = useContext(TypeOfProgramSelected)
    const [newProgram, setnewProgram] = useState(program)
    const [newType, setnewType] = useState(type)

    function updateProgram(value) {
        setnewProgram(value)
    }

    function updateType(value) {
        setnewType(value)
    }

    return {
        program: newProgram,
        updateProgram,
        type: newType,
        updateType
    }
}

export { useProgram }