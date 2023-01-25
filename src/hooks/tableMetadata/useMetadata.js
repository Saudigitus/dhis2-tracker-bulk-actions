import { useEffect } from "react";
import { useFetchData } from "../common/useFetchData.js";

const fields = "*"

const paramsType = ({ page, pageSize }) => ({
    pageSize: pageSize,
    page: page,
    totalPages: true

})

const resourceTypes = (props) => ({
    resource: props?.resource,
    fields,
    variables: { id: props?.id },
    params: paramsType(props)
})

export const useMetadata = ({ resource, page, pageSize }) => {

    const { error, loading, objects, validationText, getData, totalPages } = useFetchData(resourceTypes({
        resource,
        page,
        pageSize,
    }))

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize])

    return {
        columnData: objects,
        error,
        loading,
        data: objects,
        validationText,
        page,
        pageSize,
        totalPages
    }
}