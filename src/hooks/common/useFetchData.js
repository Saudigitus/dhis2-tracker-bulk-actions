import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useState } from 'react'
import { generalQuery } from '../../api/requests.js'

export const useFetchData = (resources, lazy = true) => {
    const [objects, setObjects] = useState(null)
    const [totalPages, settotalPages] = useState(0)
    const [allData, setAllData] = useState(null)
    const { resource, fields, params, variables } = resources
    const [loading, setloading] = useState(false)
    const { engine, refetch, error, data, loading: loadingQuery } = useDataQuery(generalQuery(resource, fields, params), { lazy, variables })


    let result = null
    function getData() {
        if (resource) {
            setloading(true)
            setObjects(null)
            engine.query(generalQuery(resource, fields, params), {
                onComplete: (res) => {
                    settotalPages(res.data?.["pager"]?.total)
                    const list = res.data[resource] || res.data
                    setObjects(list)
                    setAllData(res)
                    setloading(false)
                },
                onError: (error) => {
                    console.error('useObjects error: ', error)
                    setloading(false)
                },
                variables
            })
        }
    }


    const validationText =
        error &&
        `${i18n.t('Something went wrong when loading the objects')} : ${error.message
        }`

    if (!lazy) {
        result = objects || data?.data[resource] || data?.data || data
    }


    return { loading: loading || loadingQuery, error, validationText, objects: result || objects, getData, refetch, totalPages, allData }
}