import { Button } from '@dhis2/ui';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function ConfirmModal({ open, handleClose, action, message, title, loading }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    No
                </Button>
                <Button loading={loading} onClick={action} primary>
                    {loading ?
                        "Loading..."
                        :
                        "Yes"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}
