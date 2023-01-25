import PropTypes from "prop-types";
import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line import/extensions
import { MenuItem } from "../menu";


const NavigationItem = ({ path, label }) => {
    // browser navigate object
    const navigate = useNavigate()

    // current pathname
    const { pathname } = useLocation()

    // If "isActive" is not null and pathname === path is true
    const isActive = pathname === path

    // Callback called when clicking on the menu item.
    // If the menu item is not active, navigate to the path
    const onClick = () => !isActive && navigate(path, { replace: true })

    return <MenuItem label={label} active={isActive} onClick={onClick} />
}

NavigationItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}

export default NavigationItem