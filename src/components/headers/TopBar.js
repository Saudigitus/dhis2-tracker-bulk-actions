/* eslint-disable react/prop-types */
import { Button } from '@dhis2/ui';
import React from 'react';
import style from './appbar.module.css'

const TopBar = (props) => {
    return (
        <div className={`${style.topBar} row`}>
            <div className={`${style.topBarDiv} col-6 col-sm-6 col-md-1 col-lg-1 col-xl-1`}>
                <Button small  value="default" onClick={props.backTo}>
                    Voltar
                </Button>
            </div>
            <div className={`${style.topBarDiv} col-6 d-flex justify-content-end d-md-none`}>
                <Button small className={style.buttonMarger} name="Primary button" destructive value="default">
                    R
                </Button>
                <Button className={style.buttonSuccess} small name="Primary button" value="default">
                    G
                </Button>
                <Button small className={style.withoutMargin} name="Primary button" primary value="default">
                    B
                </Button>
            </div> 
            
            <div className="col-sm-12 col-md-5 col-lg-5 col-xl-4"><span className={style.label}>Unidade Social: </span> <span className={style.value}>{props.socilaUnit}</span></div>
            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3"><span className={style.label}>Data de entrada: </span> <span className={style.value}> {props.startDate}</span></div>

            <div className="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-4 d-none d-md-block">
                <div className="d-flex justify-content-end">
                     <Button small className={style.buttonMarger} name="Primary button" destructive value="default">
                        R
                    </Button>
                    <Button className={style.buttonSuccess} small name="Primary button" value="default">
                        G
                    </Button>
                    <Button small className={style.withoutMargin} name="Primary button" primary value="default">
                        B
                    </Button>
                </div>
               
            </div>                
        </div>
    )
}

export default TopBar
