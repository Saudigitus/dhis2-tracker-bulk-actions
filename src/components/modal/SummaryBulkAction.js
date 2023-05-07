/* eslint-disable react/prop-types */
import { Button, ButtonStrip, Label, Modal, ModalActions, ModalContent, ModalTitle } from '@dhis2/ui'
import { Collapse, Divider, IconButton } from '@material-ui/core';
import React from 'react'
import styles from './summary.module.css';
import { InfoOutlined } from '@material-ui/icons';

// eslint-disable-next-line react/prop-types

const SummaryBulkAction = ({show, handleClose, tEItransfered, selectedIndex, handleErrorClick}) => {

    return (
        <Modal large open={show} position={'middle'} onClose={handleClose}>
        <ModalTitle>{('Bulk Delete Action')}</ModalTitle>
        <ModalContent>
            <div style={{ background: "rgb(243, 245, 247)", height: "20px", marginTop: 10 }}></div>
            {tEItransfered.map((x, index) =>
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, marginTop: 8, width: '100%' }}>
                                <div>

                                    <Label color="muted" style={{ marginLeft: "5px" }}>
                                        <strong>{x.name.split(";")[0].split(":")[0]} </strong>
                                        {x.name.split(";")[0].split(":")[1]}
                                        {" "}
                                        <strong>{x.name.split(";")[1].split(":")[0]} </strong>
                                        {x.name.split(";")[1].split(":")[1]}
                                    </Label >

                                </div>
                                <div style={{marginLeft: "auto", width: 100, height: "auto" }}>
                                        {x.status === "SUCCESS" ?
                                            <span className={styles.successStatus}>Success</span>
                                            :
                                            <div className='d-flex align-items-center'>
                                                <span className={styles.errorStatus}>Error</span> 
                                                <IconButton style={{color: "#C21A3D", marginBottom: 10}} onClick={() => handleErrorClick(index)} size='small' title='More details'>
                                                    <InfoOutlined fontSize='small' />
                                                </IconButton>
                                            </div>
                                        }
                                </div>

                            </div>
                            <Collapse in={selectedIndex === index}> <div className={styles.errorMessage}>{x?.error?.message} </div> </Collapse>
                            <Divider />
                </>
            )}
        </ModalContent>
        <ModalActions>
            <ButtonStrip end>
                <Button secondary name="hide-modal"onClick={handleClose}>
                    Close
                </Button>
            </ButtonStrip>
        </ModalActions>

    </Modal >
    )
}

export { SummaryBulkAction }