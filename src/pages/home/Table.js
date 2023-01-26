import Paper from '@material-ui/core/Paper';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { ListContent, WithPadding } from '../../components';
import generalPagesStyles from "../Pages.module.css";
// eslint-disable-next-line import/extensions


function List() {
    const type = "WITH_REGISTRATION"
    const [searchParams] = useSearchParams();
    const programId = searchParams.get('programId');
    const ouId = searchParams.get('ou');

    return (
        <>
            {(programId && ouId) &&
                <div className={generalPagesStyles.pageStyle}>
                    <Paper>
                        <>
                            <ListContent
                                program={programId}
                                type={type}
                            />
                        </>
                    </Paper>
                </div>
            }
            <div style={{ height: programId ? 0 : 400 }}>
                <WithPadding />
            </div>
        </>
    )
}

export default List