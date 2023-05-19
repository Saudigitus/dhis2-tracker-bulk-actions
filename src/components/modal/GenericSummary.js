/* eslint-disable react/prop-types */
import { Button, ButtonStrip, Label, Modal, ModalActions, ModalContent, ModalTitle } from '@dhis2/ui'
import { Collapse, Divider, IconButton, LinearProgress } from '@material-ui/core';
import { CheckCircleOutline, InfoOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import styles from './summary.module.css';

// eslint-disable-next-line react/prop-types

const GenericSummary = ({ show, handleClose, tEItransfered, selectedIndex, handleErrorClick, modalType, loading }) => {
    const [openDetails, setOpenDetails] = useState(false)
    return (
        <Modal large open={show} position={'middle'} onClose={() => { handleClose(); setOpenDetails(false) }}>
            <ModalTitle>
                {modalType === "transfer" && 'Permanent Transfer Summary'}
                {modalType === "TEMPtransfer" && 'Temporary Transfer Summary'}
                {modalType === "delete" && 'Bulk Delete Action Summary'}
                {modalType === "ChangeStatus" && 'Change Enrollment Status Summary'}
                {modalType === "diffProgram" && 'Enroll to Different Program Summary'}
            </ModalTitle>
            <ModalContent className="py-2">
                {loading ? <LinearProgress /> :
                    <>
                        <span className={styles.dataSubmitted}>
                            <CheckCircleOutline fontSize='small' /> Data submitted successfully.
                        </span>

                        <div className='py-3'>
                            <h5 className='my-2'>Summary</h5>
                            <div className='d-flex mt-3'>
                                <div className={styles.imported}>
                                    <div>
                                        <h5 className='text-center'>{tEItransfered.filter(x => x.status === "SUCCESS").length}</h5>
                                        <span>Imported</span>
                                    </div>
                                </div>
                                {/*<div className={styles.updated}>
                                    <div>
                                        <h5 className='text-center'>0</h5>
                                        <span>Updated</span>
                                    </div>
    </div>*/}
                                <div className={styles.ignored}>
                                    <div>
                                        <h5 className='text-center'>{tEItransfered.filter(x => x.status === "ERROR").length}</h5>
                                        <span>Ignored</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.moreDetails} onClick={() => setOpenDetails(!openDetails)}>
                                <InfoOutlined fontSize='small' /> More details
                            </div>

                        </div>
                        <Collapse in={openDetails}>
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
                                        <div style={{ marginLeft: "auto", width: 100, height: "auto" }}>
                                            {x.status === "SUCCESS" ?
                                                <span className={styles.successStatus}>Success</span>
                                                :
                                                <div className='d-flex align-items-center'>
                                                    <span className={styles.errorStatus}>Error</span>
                                                    <IconButton style={{ color: "#C21A3D", marginBottom: 10 }} onClick={() => handleErrorClick(index)} size='small' title='More details'>
                                                        <InfoOutlined fontSize='small' />
                                                    </IconButton>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    <Collapse in={selectedIndex === index}> <div className={styles.errorMessage}>{x?.error} </div> </Collapse>
                                    <Divider />
                                </>
                            )}
                        </Collapse>
                    </>}
                <ModalActions>
                    <ButtonStrip end>
                        <Button secondary name="hide-modal" onClick={handleClose}>
                            Close
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </ModalContent>
        </Modal>
    )
}

export { GenericSummary }