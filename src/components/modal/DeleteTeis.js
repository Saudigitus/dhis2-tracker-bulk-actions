import {
    Button,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Box,
    Label
} from '@dhis2/ui'
import { Divider, IconButton, LinearProgress } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons';
import React, { useState, useContext } from 'react'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles'
import { useParams } from '../../hooks/common/useQueryParams';
import { useVerifyOuAcess } from '../../hooks/programs/useVerifyOuAcess';
import { useTransferTEI } from '../../hooks/bulkoperations/useTransfer';
import { OrgUnitCard } from '../OrgUnitTree';
import { ConfirmBulkAction } from './ConfirmBulkAction';
import { SummaryBulkAction } from './SummaryBulkAction';
// import { OptionFields } from '../genericFields/fields/SingleSelect'

function Testing({ name, Component }) {
    return (
        <div style={{ display: "flex", marginTop: 15, marginBottom: 0 }}>
            <div>
                <Label color="muted" style={{ marginLeft: "5px", marginTop: 10, }}> <span style={{ fontWeight: "bold" }}>{name}</span></Label >
            </div>
            <div style={{ marginLeft: "auto", width: 350, height: "auto" }}>
                <Component />
            </div>

        </div>
    )
}

const BulkDeleteAction = ({openModalConfirmBulk, handleClose, showSummaryModal, handleCloseSummary, loading, selectRows, setselectRows, selectedTeis, modalType, nameOfTEIType, ouName, action, tEItransfered }) => {

    return (
        <div>
            {tEItransfered.length === 0 ?
                <ConfirmBulkAction
                    modalType={modalType}
                    show={openModalConfirmBulk}
                    handleClose={handleClose}
                    //action={handleClose}
                    loading={loading}
                    selectRows={selectRows}
                    setselectRows={setselectRows}
                    selectedTeis={selectedTeis}
                    nameOfTEIType={nameOfTEIType}
                    ouName={ouName}
                    label={"Delete"}
                    action={action}
                    tEItransfered={tEItransfered}
                />
            :
            <SummaryBulkAction show={showSummaryModal} handleClose={handleCloseSummary} tEItransfered={tEItransfered}/>
            }
        </div>
    )
}

export default BulkDeleteAction
