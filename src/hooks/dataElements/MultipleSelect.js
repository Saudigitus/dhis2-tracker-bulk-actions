// eslint-disable-next-line import/extensions
import { filterOnlyTrue } from "../../utils/dataElements/FilterOnlyTrue.js";
import { useFetchData } from "../common/useFetchData.js";

const fields = "dataElements[id~rename(value),displayName~rename(label),valueType]"

const resourceTypes = (fields, id) => ({
    resource: "programStageSections",
    fields,
    variables: { id }
})

export const useSection = ({ id }) => {
    const { error, loading, objects, validationText } = useFetchData(
        resourceTypes(fields, id),
        false
    )

    return {
        options: filterOnlyTrue(objects),
        error,
        loading,
        data: objects,
        validationText
    }
}