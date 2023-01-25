import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button style={{
                color: "rgb(33, 41, 52)",
                fontSize: 14,
                textTransform:"none",
                fontWeight: 400,
            }}
                size="small"
                variant='outlined'
                onClick={handleClick}>
                Bulk action
            </Button>
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
                <MenuItem onClick={handleClose}>Permanent Tranfer</MenuItem>
                <MenuItem onClick={handleClose}>Close Enrollment</MenuItem>
            </Menu>
        </>
    );
}
