import React, {useContext} from 'react'
import AppBar from '../headers/AppBar'
import styles from '../../pages/Pages.module.css'
import TopBar from '../headers/TopBar'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@dhis2/ui'
import { useGetTEIByID } from '../../hooks/tei/useGetTEIByID'
import dateFormat from 'dateformat'
import { AppBarContext } from '../../contexts'


const GlobalLayout = ({ children }) => {
    const location = useLocation().pathname
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { setFilter } = useContext(AppBarContext);


    const navigateTo = () => {
        searchParams.delete('program')
        searchParams.delete('processType')
        navigate(`/home?${searchParams.toString()}`);
    }
    

    return (
        <div>
            <AppBar />
            {children}
        </div>
    )
}

const TEILayout = ({ children }) => {
    const [searchParams] = useSearchParams()
    const teiId = searchParams.get('tei')
    const ouName = searchParams.get('ouName')
    const programId = searchParams.get('program')
    let navigate = useNavigate()
    const { data, loadingTei } = useGetTEIByID({ teiID: teiId, program: programId, fields: "createdAt" })

    return (
        <div>
            <TopBar
                backTo={()=>navigate(-1)}
                socilaUnit={ouName}
                startDate={loadingTei ? " " : dateFormat(data?.createdAt, "dd-mm-yyyy")}
            />
            {children}
        </div>
    )
}

export { GlobalLayout, TEILayout }
