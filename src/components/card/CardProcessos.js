/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import style from './card.module.css';
import { getTypesCards } from './cardStylesType/cardStyleType';

function CardProcessos(props){
    return (
        <div className={style[getTypesCards(props)]}>
            <span className={style.processId}>{props.processId}</span>
            <span className={style.processType}>{props.processType}</span>
            <span className={style.processDate}>{props.processDate}</span>
        </div>
    )
}

export default CardProcessos