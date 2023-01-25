/* eslint-disable react/prop-types */
import React from 'react';
import style from './card.module.css';


function CardPrgStgCNPA(props) {

  const changeActiveCard = () => {
    var updatedStages = props.stagesList;
    if (!props.isActive) {
      updatedStages = []
      for (const stage of props.stagesList) {
        if (stage.active) {
          delete stage.active
        }
        if (stage.name === props.title) {
          stage.active = "is-active"
        }
        updatedStages.push(stage)
      }
      props.setData(updatedStages)
    }
  }

  return (
    <div onClick={changeActiveCard} className={style[props.isActive] || style.PrgStgCard}>
      <span className={style.PrgStgCardTitle}>{props.title}</span>
    </div>
  )
}

export default CardPrgStgCNPA