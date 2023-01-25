import { useState, useEffect, useContext } from 'react';


export const useIndexDB = () => {
    const [db, setDb] = useState(null);
    const dbName = "optionSetsDb"


    const addData = async (data) => {
        await localStorage.setItem(dbName, JSON.stringify(data));
    };

    const getData = () => {
        return JSON.parse(localStorage.getItem(dbName));
    };

    return {
        addData,
        getData,
    }
};
