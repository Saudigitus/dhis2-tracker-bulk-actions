import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppBarContext } from '../contexts';
import "./App.css";
import { GeneratedVaribles } from '../contexts/GeneratedVaribles.js';
import { useDataQuery } from '@dhis2/app-runtime';
import { CenteredContent, CircularLoader } from '@dhis2/ui';

const idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;


const me = {
    results: {
        resource: "me",
        params: {
            fields: "organisationUnits[id,displayName]",
        }
    },

}

const MyApp = () => {
    // initDB(DBConfig);
    const dbName = "optionSetsDb"
    var oneYearAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    const [selectedOu, setSelectedOu] = useState();
    const [startDate, setStartDate] = useState(oneYearAgo);
    const [endDate, setEndDate] = useState(new Date());
    const [initOU, setInitOu] = useState(false);
    const [autoGenerated, setautoGenerated] = useState({})
    const [filter, setFilter] = useState('');
    const [externalUser, setexternalUser] = useState("")
    const [externalBaseUrl, setexternalBaseUrl] = useState("")
    const [allOptionSets, setallOptionSets] = useState({})
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [reloadData, setreloadData] = useState(false)
    const [selectRows, setselectRows] = useState([])
    const [programs, setprograms] = useState([])
    const [userOrgUnit, setuserOrgUnit] = useState({})
    const [tEItransfered, setTEItransfered] = useState([])
    const [allTeisFormated, setallTeisFormated] = useState()

    const { data, loading, error } = useDataQuery(me)

    useEffect(() => {
        getDb()
    }, [])

    async function getDb() {
        const db = await idb.open(dbName, 1);
        setexternalUser(db);
    }

    useEffect(() => {
        setuserOrgUnit({
            data: data,
            error: error
        })
    }, [data])

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }


    return (
        <GeneratedVaribles.Provider value={{
            autoGenerated,
            setautoGenerated,
            externalUser,
            externalBaseUrl,
            allOptionSets,
            setallOptionSets,
            order, setOrder,
            orderBy, setOrderBy,
            reloadData,
            setreloadData,
            setselectRows,
            selectRows,
            setprograms,
            programs,
            userOrgUnit,
            tEItransfered,
            setTEItransfered,
            allTeisFormated,
            setallTeisFormated
        }}>
            <AppBarContext.Provider value={{
                selectedOu: selectedOu,
                setSelectedOu: setSelectedOu,
                startDate: startDate,
                setStartDate: setStartDate,
                endDate: endDate,
                setEndDate: setEndDate,
                initOU: initOU,
                setInitOu: setInitOu,
                setFilter: setFilter,
                filter: filter
            }}>
                <div className="">
                    <Layout />
                </div >
            </AppBarContext.Provider>
        </GeneratedVaribles.Provider>
    )
}

export default MyApp
