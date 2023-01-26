/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import { Input } from '@dhis2/ui';
import { Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { OrgUnitTreeComponent } from '../..';
import style from "../../card/card.module.css";

const OrgUnitCard = ({ expanded, selected, onChange }) => {

  const [query, setQuery] = useState("")

  return (
    <div className={style.orgUnitCard}>
      {/*      <Input onChange={(event) => setQuery(event.value)} label="An input" name="input" placeholder="search" />
  <Divider />*/}
      <div className={style.cardTree}>
        <OrgUnitTreeComponent query={query} initiallyExpanded={expanded} selected={selected} onChange={onChange} />
      </div>
    </div>
  )
}

export default OrgUnitCard