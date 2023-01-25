import { createContext } from 'react'

export const TableContext = createContext({
    columns: {},
    header: {},
    page: {},
    pageSize: {}
})

