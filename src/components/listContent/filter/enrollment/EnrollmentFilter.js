import React, { useState, useContext } from 'react'
// eslint-disable-next-line import/extensions
import SelectColumns from '../../selectColumns/SelectColumns'
// eslint-disable-next-line import/extensions
import ContentFilter from './ContentFilter'
import { Typography } from '@material-ui/core'
import { ConfirmBulkAction } from '../../../modal/ConfirmBulkAction'
import { GeneratedVaribles } from '../../../../contexts/GeneratedVaribles'
import { useParams } from '../../../../hooks/common/useQueryParams'


const style = {
    backgroundColor: "#E8F5E9",
    padding: 7,
    color: "#103713",
    fontSize: 15,
    borderRadius: 5,
    cursor: "pointer"
}

// eslint-disable-next-line react/prop-types
function EnrollmentFilter({ headers, updateVariables, type, selectedTeis }) {
    const { useQuery } = useParams()
    const [openModalConfirmBulk, setOpenModalConfirmBulk] = useState(false)
    const handleCloseConfirmAction = () => setOpenModalConfirmBulk(false);
    const { programs = [], selectRows = [], setselectRows } = useContext(GeneratedVaribles)
    const programId = useQuery().get("programId")

    function nameOfTEIType() {
        return programs.find(x => x.value === programId)?.trackedEntityType?.name || ""
    }

    return (
        <div className='px-3' style={{ display: "flex", justifyContent: "space-between" }}>
            <ContentFilter headers={headers} type={type} />
            <div className='row'>
                {selectedTeis.length > 0 &&
                    <span className='m-2'>
                        <Typography  onClick={() => setOpenModalConfirmBulk(true)} style={style} color="inherit" variant="subtitle1" component="div">
                            {selectedTeis.length} Selected
                        </Typography>
                    </span>
                }
                <SelectColumns
                    updateVariables={updateVariables}
                    headers={headers}
                />
            </div>

            {(openModalConfirmBulk) &&
                <ConfirmBulkAction
                    show={openModalConfirmBulk}
                    handleClose={handleCloseConfirmAction}
                    selectRows={selectRows}
                    setselectRows={setselectRows}
                    selectedTeis={selectedTeis}
                    nameOfTEIType={nameOfTEIType}
                    orgUnitSelected={{}}
                />
            }
        </div>
    )
}

export default EnrollmentFilter