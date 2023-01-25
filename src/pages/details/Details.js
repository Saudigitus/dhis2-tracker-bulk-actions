import React from 'react'
import { WithPadding } from '../../components';
import { useSearchParams } from 'react-router-dom';
import generalPagesStyles from "../Pages.module.css";


function Details() {
    const [searchParams] = useSearchParams()
    const programId = searchParams.get('program')


    return (
        <>
        <div className={generalPagesStyles.pageStyle}>
            <h1>Detalhes</h1>
        </div>

        <WithPadding />
    </>
    )
}
export default Details