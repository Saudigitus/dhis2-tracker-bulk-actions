import { Button } from '@dhis2/ui'
import propTypes from "prop-types";
import React from 'react'
import { getTypesOfButton } from '../../utils/commons/getTypesButtons.js';
import style from './button.module.css'

//@TODO: @EdsonNhancale There must be a way to customize the buttons

function ButtonComponent(props) {
    return (
        <Button className={style[getTypesOfButton(props)]}  {...props} >
            {props.children}
            {props.name}
        </Button>
    )
}

ButtonComponent.propTypes = {
    props: propTypes.object.isRequired,
    children: React.Component
}

export default ButtonComponent