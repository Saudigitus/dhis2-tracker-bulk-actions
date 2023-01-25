/* eslint-disable react-hooks/exhaustive-deps */
import i18n from '@dhis2/d2-i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react'
// eslint-disable-next-line import/extensions
import ButtonComponent from '../../buttons/Button';
// eslint-disable-next-line import/extensions
import DragDropList from '../../dragDrop/DragDropList.js';

const primaryButton = {
    name: "Save",
    primary: "primary"
}

function DialogSelectColumns(props) {
    // eslint-disable-next-line react/prop-types
    const { open, onClose, headers = [], updateVariables } = props
    // eslint-disable-next-line react/prop-types

    const [columnsList, setcolumnsList] = useState([])

    function handleToggle(id) {
        const localColumns = (columnsList.length > 0 && [...columnsList]) || [...headers]

        const index = localColumns.findIndex(column => column.id === id);

        localColumns[index] = { ...localColumns[index], visible: !localColumns[index].visible };

        setcolumnsList(localColumns)
        // console.log(localColumns)
    };

    const handleSave = () => {
        // eslint-disable-next-line react/prop-types
        updateVariables(columnsList)
        onClose()
    };

    const handleUpdateListOrder = (sortedList) => {
        setcolumnsList(sortedList)
    };

    return (
        <>
            <Dialog
                open={!!open}
                onClose={onClose}
                fullWidth
            >
                <DialogTitle>{i18n.t('Columns to show in table')}</DialogTitle>
                <DialogContent>
                    <DragDropList
                        // eslint-disable-next-line react/prop-types
                        listItems={(columnsList.length > 0 && columnsList) || headers}
                        handleUpdateListOrder={handleUpdateListOrder}
                        handleToggle={handleToggle}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonComponent onClick={handleSave} {...primaryButton} autoFocus />
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogSelectColumns