/* eslint-disable react/prop-types */
import { Button } from '@dhis2/ui';
import { Collapse, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAge } from '../../utils/commons/getAge';
import TEIComponentEdit from '../teiComponent/TEIComponentEdit';
import style from './appbar.module.css'

const ProfileAppBar = ({data, getData }) => {
    const [searchParams] = useSearchParams();
    const programId = searchParams.get('program');
    const trackedEntitytype = searchParams.get('trackedEntitytype');
    const [openProfile, setOpenProfile] = useState(false);
    const [disable, setDisable] = useState(true);


    return (
        <div> 
            <div className={`${style.gridProfileAppBar} row m-0`}>
          
                    <div className={`${style.profileAppBar} col-md-8 col-lg-9 col-xl-10 ${openProfile ? "col-sm-6 col-6" : "col-sm-12"}`}>
                        {!openProfile ? 
                            <>
                                {trackedEntitytype === 'Processo' ?
                                    <>
                                        <div><span className={style.label}>Tipo de Medida de Protecção Alternativa: </span> <span className={style.value}>{data?.["Tipo de Medida de Protecção Alternativa"] || "--"}</span></div>
                                        <div><span className={style.label}>Número de Entrada nos Serviços de Acção Social: </span> <span className={style.value}> {data?.["Número de Entrada nos Serviços de Acção Social"] || "--"}</span></div>
                                        <div><span className={style.label}>Nº do Processo no Caso: </span> <span className={style.value}> {data?.["Nº do Processo no Caso"] || "--"}</span></div>
                                    </>
                                :
                                    <>
                                        <div><span className={style.label}>Número Único de Identificação: </span> <span className={style.value}>{data?.["Número Único de Identificação "] || "--"}</span></div>
                                        <div><span className={style.label}>Nome Completo: </span> <span className={style.value}> {!data?.["Nome "] && !data?.["Apelido"] ? "--" : `${data?.["Nome "] || ""} ${data?.["Apelido"] || ""}`}</span></div>
                                        <div><span className={style.label}>Sexo: </span> <span className={style.value}> {data?.["Sexo"] && (data?.["Sexo"] === 'M' ? 'Masculino' : 'Feminino') || "--"}</span></div>
                                        <div><span className={style.label}>Idade: </span> <span className={style.value}> {data?.["Data de Nascimento"] ? `${getAge(data?.["Data de Nascimento"])}` : "--"}</span></div>
                                    </>
                                }
                            </>
                            
                        :
                            <span style={{marginLeft: 10, fontWeight: 500 }}>
                                Enrollment
                            </span>
                        }
                    </div>
                

                <div className={`col-md-4 col-lg-3 col-xl-2 ${style.viewProfileButton}  ${openProfile ? "col-sm-6 col-6" : "col-sm-12"}`}>
                    {openProfile ? 
                        <Button onClick={() => setOpenProfile(false)} small>
                            Ocultar Perfil
                        </Button>
                    : 
                        <Button small name="Primary button" onClick={() => setOpenProfile(true)} primary value="default">
                            Visualizar Perfil
                        </Button>
                    } 
                </div>
            </div>
            
            <Collapse 
                in={openProfile} 
                timeout={500} 
                children={
                    <TEIComponentEdit program={programId} setOpenProfile={()=> setOpenProfile(false)} disabled={disable} setDisable={()=> setDisable(!disable)} getData={getData} /> 
                }
            />      
        </div>
    )
}

export default ProfileAppBar
