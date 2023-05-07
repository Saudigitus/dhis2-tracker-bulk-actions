/* eslint-disable react/prop-types */
import { Button, ButtonStrip, Checkbox, CircularLoader, Label, Modal, ModalActions, ModalContent, ModalTitle } from '@dhis2/ui'
import { Divider, IconButton } from '@material-ui/core';
import { Check, Close, Refresh } from '@material-ui/icons';
import React, { useState } from 'react'
import SingleSelectField from '../SingleSelectComponent/SingleSelectField';

// eslint-disable-next-line react/prop-types

const SummaryBulkAction = ({show, handleClose,  tEItransfered}) => {

    return (
        <Modal large open={show} position={'middle'} onClose={handleClose}>
        <ModalTitle>{('Bulk Delete Action')}</ModalTitle>
        <p />
        <ModalContent>
            {tEItransfered.map(x =>
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
                                        <small className='text-success'>Success</small>
                                        :
                                        <small className='text-danger'>Error</small>
                                    }
                                </div>

                            </div>
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