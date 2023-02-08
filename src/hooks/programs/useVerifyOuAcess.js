import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles";


export const useVerifyOuAcess = () => {
    const { programs } = useContext(GeneratedVaribles)

    function verifyAcess(programId, ouId) {
        if (programs?.length > 0) {
            const currentProgram = programs?.find(e => e.value === programId)

            const result = currentProgram?.organisationUnits?.findIndex(e => e.id === ouId)
            return result > -1
        }
    }
    return {
        verifyAcess
    }
}

