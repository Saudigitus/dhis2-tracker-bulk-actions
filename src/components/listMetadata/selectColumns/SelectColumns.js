import i18n from '@dhis2/d2-i18n';
import { IconSettings24 } from '@dhis2/ui';
import { IconButton, Tooltip } from '@material-ui/core';
import React, { useState } from 'react'
import DialogSelectColumns from './DialogSelectColumns.js';

// eslint-disable-next-line react/prop-types
function SelectColumns({ headers, updateVariables }) {
    const [open, setopen] = useState(false)

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
            <Tooltip
                disableFocusListener
                disableTouchListener
                enterDelay={500}
                title={i18n.t('Select columns')}
            >
                <IconButton
                    onClick={openDialog}
                >
                    <IconSettings24 />
                </IconButton>
            </Tooltip>
            <DialogSelectColumns
                open={open}
                onClose={closeDialog}
                onSave={handleSaveColumns}
                updateVariables={updateVariables}
                headers={headers}
            />
        </React.Fragment>
    )
}

export default SelectColumns