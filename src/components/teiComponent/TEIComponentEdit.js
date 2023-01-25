import { CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppBarContext } from '../../contexts'
// eslint-disable-next-line import/extensions
import { useCreateEnrollment } from '../../hooks/tei/useCreateEnrollment'
// eslint-disable-next-line import/extensions
import { useGetAttributes } from '../../hooks/tei/useGetAttributes'
import { useGetTEIByID } from '../../hooks/tei/useGetTEIByID'
// eslint-disable-next-line import/extensions
import useGetTEIType from '../../hooks/tei/useGetTEIType'
// eslint-disable-next-line import/extensions
import { organizeAttributes } from '../../utils/commons/organizeAttributes'
// eslint-disable-next-line import/extensions
import TEIFormComponent from './TEIForm'

function typeView(type) {
    if (type === 'view') {
        return <span>View Enrollment</span>
    }
    if (type === 'edit') {
        return <span>Enrollment</span>
    } else {
        return <span>New Enrollment</span>
    }
}

const formEdit = (orgUnit, tei, TEIType, attributes) => ({
    trackedEntities: [
        {
            attributes: attributes,
            trackedEntity: tei,
            trackedEntityType: TEIType,
            orgUnit: orgUnit,
        },
    ],
})

const type = 'edit'
function TEIComponentEdit(props) {
    const { program } = props
    const { attributes = [], loading } = useGetAttributes({ program })
    // eslint-disable-next-line react/prop-types

    const [searchParams] = useSearchParams()
    const teiID = searchParams.get('tei')
    const selectedOu = searchParams.get('ou')
    const { teitype } = useGetTEIType(program)
    const { loading: loadingMutate, mutate } = useCreateEnrollment({
        message: 'Enrollment edited successfully',
        onComplete: function (params) {
            props.setDisable(true)
            props.getData()
        },
    })
    const { attributeValues, loadingTei, getData } = useGetTEIByID({ teiID, program, setDisable: props.setDisable })

    if (loading || loadingTei) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    async function editEnrollment(form) {
        await mutate({
            data: formEdit(
                selectedOu,
                teiID,
                teitype,
                organizeAttributes(form)
            ),
        })
    }

    return (
        <TEIFormComponent
            variables={attributes}
            typeView={typeView(type)}
            type={type}
            loadingMutate={loadingMutate}
            createEnrollment={editEnrollment}
            initialValues={attributeValues}
            setOpenProfile={props.setOpenProfile}
            disabled={props.disabled}
            setDisable={props.setDisable}
            refetch={getData}
        />
    )
}

export default TEIComponentEdit
