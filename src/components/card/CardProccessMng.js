/* eslint-disable react/prop-types */
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import style from './card.module.css';


function CardProccessMng(props) {
  return (
    <div className={style.cardProccessMng}>
      <button onClick={()=>{props.setSelectRelationShip(props.trackerData),props.handleShow()}} className={style.buttonContainer}>
        <ClearIcon style={{fontSize:'15px'}}/>
      </button>
      <span className={style.mCardprocessId}>
        {props.pocessId}
      </span>
      <span>{props.name}</span>
      <span>{props.sex}</span>
      <span>{props.age}</span>
      <span className='text-center'>{props.dateIn}</span>
    </div>
  )
}

export default CardProccessMng