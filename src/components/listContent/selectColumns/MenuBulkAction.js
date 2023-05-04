import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function SimpleMenu({ anchorEl, setAnchorEl, setopenModalBulkTranfer, modalType }) {
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MenuItem onClick={() => { setopenModalBulkTranfer(true); setAnchorEl(null); modalType("transfer") }}>Permanent Transfer</MenuItem>
                <MenuItem onClick={() => { setopenModalBulkTranfer(true); setAnchorEl(null); modalType("TEMPtransfer") }}>Temporary Transfer</MenuItem>
            </Menu>
        </>
    )
}
