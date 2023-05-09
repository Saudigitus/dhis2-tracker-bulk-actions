import i18n from '@dhis2/d2-i18n';
import { IconSettings24, Layer, Popover, Popper } from '@dhis2/ui';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import React, { useState, useRef } from 'react'
import TranferEnrollment from '../../modal/TranferEnrollment.js';
import DialogSelectColumns from './DialogSelectColumns.js';
import SimpleMenu from './MenuBulkAction.js';
import MenuBulkAction from './MenuBulkAction.js';

// eslint-disable-next-line react/prop-types
function SelectColumns({ headers, updateVariables }) {
    const [open, setopen] = useState(false)
    const [openModalBulk, setopenModalBulk] = useState(false)

    const closeDialog = () => {
        setopen(false)
    }


    const openDialog = () => {
        setopen(true)
    }

    const handleSaveColumns = (columns) => {
        // this.props.onSave(columns);
        closeDialog();
    }

    return (
        <React.Fragment>
            <div>
                <span style={{ paddingRight: 10 }} />
                <Tooltip
                    disableFocusListener
                    disableTouchListener
                    enterDelay={500}
                    title={i18n.t('Select columns')}
                >
                    <IconButton
                        onClick={openDialog}
                        className="my-auto"
                    >
                        <IconSettings24 />
                    </IconButton>
                </Tooltip>
            </div>


            <DialogSelectColumns
                open={open}
                onClose={closeDialog}
                onSave={handleSaveColumns}
                updateVariables={updateVariables}
                headers={headers}
            />

            {openModalBulk && <TranferEnrollment
                open={openModalBulk}
                setopen={setopenModalBulk}
            />}


        </React.Fragment>
    )
}

export default SelectColumns