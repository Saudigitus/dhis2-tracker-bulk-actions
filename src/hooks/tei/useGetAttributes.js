// eslint-disable-next-line import/extensions
import { formatResponseTEI } from "../../utils/tei/formatResponseTEI"
// eslint-disable-next-line import/extensions
import { useFetchData } from "../common/useFetchData"

const fieldsType = {
    fields: "enrollmentDateLabel,programTrackedEntityAttributes[searchable,displayInList,mandatory,trackedEntityAttribute[generated,pattern,id,displayName,valueType,optionSet[options[code~rename(value),displayName~rename(label)]]]]"
}

const resource = (id) => ({
    resource: "programs",
    ...fieldsType,
    variables: { id }
})

export const useGetAttributes = (props) => {
    const { program } = props

    const { error, loading, objects, validationText } = useFetchData(
        resource(program),
        false
    )

    return {
        attributes: formatResponseTEI(objects) || [],
        enrollmentDateLabel: objects?.enrollmentDateLabel,
        error,
        loading,
        data: objects,
        validationText,
    }
}