/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import { Input } from '@dhis2/ui';
import { Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { OrgUnitTreeComponent } from '../..';
import style from "../../card/card.module.css";
import OrgUnitTreeModal from '../orgUnitTreeModal';

const OrgUnitCard = ({ expanded, selected, onChange, modal = false }) => {

  const [query, setQuery] = useState("")

  return (
    <div className={style.orgUnitCard}>
      {/*<Input onChange={(event) => setQuery(event.value)} label="An input" name="input" placeholder="Pesquisar..." />
      <Divider />
    */}
      <div className={style.cardTree}>
        {modal ?
          <OrgUnitTreeModal query={query} initiallyExpanded={expanded} selected={selected} onChange={onChange} />
          :
          <OrgUnitTreeComponent query={query} initiallyExpanded={expanded} selected={selected} onChange={onChange} />
        }
      </div>
    </div >
  )
}

export default OrgUnitCard