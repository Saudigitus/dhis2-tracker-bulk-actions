import Paper from '@material-ui/core/Paper';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { ListContent, WithPadding } from '../../components';
import generalPagesStyles from "../Pages.module.css";
// eslint-disable-next-line import/extensions


function List() {
    const type = "WITHOUT_REGISTRATION"
    const [searchParams] = useSearchParams();
    const programId = searchParams.get('program');
    const ouId = searchParams.get('ou');

    return (
        <>
            <div className={generalPagesStyles.pageStyle}>
                <Paper>
                    {(programId && ouId) &&
                        <>
                            <div className={generalPagesStyles.moduleTitleComponent}>Eventos Registrados </div>
                            <ListContent
                                program={programId}
                                type={type}
                            />
                        </>
                    }
                </Paper>
            </div>

            <WithPadding />
        </>
    )
}

export default List