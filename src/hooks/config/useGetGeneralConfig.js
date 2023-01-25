import { useConfig, useDataMutation } from '@dhis2/app-runtime'
import { useEffect } from 'react'
import { useFetchData } from "../common/useFetchData"

const resource = {
    resource: "dataStore/generalConfig/config"
}

const resourceCreate = {
    resource: "dataStore/generalConfig/config",
    type: "create",
    data: ({ data }) => data
}

export const useGetGeneralConfig = () => {
    const { objects, error, loading, getData } = useFetchData(resource, false)
    const [mutate] = useDataMutation(resourceCreate, { lazy: true })
    const { baseUrl } = useConfig()

    useEffect(() => {
        createDataStore()
    }, [error])

    const createDataStore = async () => {
        await mutate({
            data: {
                "baseUrlApi": "https://apps.hisplp.org/mozapi",
                "baseUrlB": "https://sisd.org.mz/mihosp",
                "config": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkxZjFlNjU0OGQwMTNiMTkxNzQwNmFkNDBmOWE0MTQzZWViOGE5NjkxMTlkNGRmY2Q1YTFkNGRiNDVjOTI0NzQ1YTZiYmMyMzkyZDMxNTQ3In0.eyJhdWQiOiIxIiwianRpIjoiOTFmMWU2NTQ4ZDAxM2IxOTE3NDA2YWQ0MGY5YTQxNDNlZWI4YTk2OTExOWQ0ZGZjZDVhMWQ0ZGI0NWM5MjQ3NDVhNmJiYzIzOTJkMzE1NDciLCJpYXQiOjE2NzM2MTQ3NDUsIm5iZiI6MTY3MzYxNDc0NSwiZXhwIjoxNzA1MTUwNzQ1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.nZxL7wnat1iR4AFFjE01MPP_1aRVx4FdAQOBpSaxCXFI0fFssQ7yzn3ydEfBgFGRNW-4e3T_vs8QAyC7cs_lCpyFb3gyvRgIjzGJCJyH0m0DnXn1eGTBQVJSFDfXZUeYFnOG05lv1VyGgvnS778j-dCINwT41KHqy9aRmfTn4Gv4MCQ0tiIXAAEdjaLaegqv7TT1eLL66zZNWUUr7mvtMBgRrNWIgEfFVS3SriDewdhy7vSd_SDHrFKmpgXLExW9n0qv3CyeW80-q61wMY_M4SvMS-yf8LWlAimR_tNSm-k1Z4wnKrZkAW6wvk01RvhZy0irok2Xl_kouOy2jSO6JJQl2m-xAVlnqitQ_Dy1xV-JfRvNs3Y9UFiYYjO6KFoe8dP9NCc5ktkv_m8KMSCWG_T0w8Z1nIbR7TBNB7vMDP39IoGUtgdkU5QMZY4XiFL4TwX_y076T8JcvMz2ErNBnoHMhM62duQudGY_UZVoKrY2_G58Nn6xHLsp6xJzV0tst7uVrlF7dBE6eVzhntll-ionuouGWwJKxQSSs7giPcdGce58xhqVNwxe8-eBHRah0jxH0C55MDwumJTyUtS3aFFOPsz_XqmAcEtVvitTjBJndat10xudx83wj-eLDKmcj2MBTqYuewdzVd24OHK-RgICMrX_gs8n_M1JQTAkRrA",
                "programStage": "m3KXHE623bx",
                "program": "BDbg3oehQRj",
            }
        })
        getData()
    }

    return {
        loading,
        data: objects,
        error
    }
}