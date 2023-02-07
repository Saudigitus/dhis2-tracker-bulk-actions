import Paper from '@material-ui/core/Paper';
import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ListContent, WithPadding } from '../../components';
import { useVerifyOuAcess } from '../../hooks/programs/useVerifyOuAcess';
import generalPagesStyles from "../Pages.module.css";
// eslint-disable-next-line import/extensions


function List() {
    const type = "WITH_REGISTRATION"
    const [searchParams] = useSearchParams();
    const programId = searchParams.get('programId');
    const ouId = searchParams.get('ou');
    const { verifyAcess } = useVerifyOuAcess()

    return (
        <>
            {(programId && ouId) &&
                <div className={generalPagesStyles.pageStyle}>
                    {verifyAcess(programId, ouId) ?
                        <Paper>
                            <>
                                <ListContent
                                    program={programId}
                                    type={type}
                                />
                            </>
                        </Paper>
                        :
                        <span style={{ color: "#E53935" }}>
                            Selected program is invalid for selected registering unit
                        </span>
                    }
                </div>
            }
            <div style={{ height: programId ? 0 : 400 }}>
                <WithPadding />
            </div>
        </>
    )
}

export default List