import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppBarContext } from '../contexts';
import "./App.css";
import { GeneratedVaribles } from '../contexts/GeneratedVaribles.js';

const idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;


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


    useEffect(() => {
        getDb()
    }, [])

    async function getDb() {
        const db = await idb.open(dbName, 1);
        setexternalUser(db);
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
            selectRows
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
