
import { useDataEngine } from "@dhis2/app-service-data";
import { useContext, useState } from "react";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles.js";
import { useIndexDB } from "./useIndexDB.js";

const OPTIONSETSQUERY = {
    response: {
        resource: "optionSets",
        id: ({ id }) => id,
        params: {
            fields: "options[code,displayName]"
        }
    }
}

export const useGetOptionSets = () => {
    const { setallOptionSets, allOptionSets } = useContext(GeneratedVaribles);
    const engine = useDataEngine();
    const [loading, setloading] = useState(false)
    const { addData } = useIndexDB()
    const dbName = "optionSetsDb"

    const getOptionsByOptionSet = async (optionSets) => {
        setloading(true)
        const localOptionSets = {}
        // console.log(localStorage.getItem(dbName));
        if (!localStorage.getItem(dbName)) {  // console.log("object");
            for (const optionSet of optionSets) {
                if (!allOptionSets.hasOwnProperty(optionSet)) {
                    const results = await engine.query(OPTIONSETSQUERY, { variables: { id: optionSet } })
                    // console.log(results?.response?.options)
                    localOptionSets[optionSet] = results?.response?.options || []
                }
            }

            setallOptionSets(localOptionSets);
            setloading(false)
            addData(localOptionSets)
        } else {
            setloading(false)
            setallOptionSets(JSON.parse(localStorage.getItem(dbName)));
        }
    }


    return {
        loading,
        getOptionsByOptionSet
    }
}