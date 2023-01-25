import { formatAttributes } from "../../utils/tableMetadata/columns/formatResponse.js";
import { useFetchData } from "../common/useFetchData.js";

const fieldsType = "properties[name,required]"

const resourceTypes = (fields, id) => ({
    resource: "schemas",
    fields,
    variables: { id }
})

export const useHeaderMetadata = ({ resource }) => {
    const { error, loading, objects, validationText } = useFetchData(
        resourceTypes(fieldsType, resource),
        false
    )

    return {
        headers: formatAttributes(objects),
        error,
        loading,
        data: objects,
        validationText
    }
}