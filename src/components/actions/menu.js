import { useConfig } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui'
import { Divider, IconButton } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { MoreHoriz } from '@material-ui/icons'
import { format } from 'date-fns';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCreateExternalEvents } from '../../hooks/events/useCreateExternalEvents.js'



// eslint-disable-next-line max-params
const formUpdate = (dataValues, orgUnit, programStage, program, eventDate, event) => ({
    "event": event,
    "program": program,
    "programStage": programStage,
    "orgUnit": orgUnit,
    "eventDate": eventDate,
    "dataValues": dataValues
})


export default function ActionsMenu({ row }) {
    const [searchParams] = useSearchParams();
    const program = searchParams.get('program');
    const orgUnit = searchParams.get('ou');
    const programStage = "m3KXHE623bx"
    const currentDate = format(new Date(), "yyyy-MM-dd")

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const { baseUrl } = useConfig()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const options = [
        {
            label: 'Visualizar detalhes',
            action: () => { handleClose(); window.open(`${baseUrl}/dhis-web-capture/index.html#/viewEvent?viewEventId=${row.id}`, "new blank") },
        },
        {
            label: row["u7dfk89C9X7"] ? "Reenviar para a investigação" : 'Enviar para a investigação',
            action: () => { handleClose(); createEvent() },
        },
    ]

    const { loading: loadingMutate, setpostData } = useCreateExternalEvents(formUpdate(row.dataValues, orgUnit, programStage, program, currentDate, row.id))


    async function createEvent() {
        setpostData(true)
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {loadingMutate ? <CircularLoader small />
                    :
                    <MoreHoriz />
                }
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {options.map((option, index) => (
                    <>
                        <MenuItem onClick={option.action} key={index}> {option.label} </MenuItem>
                        {!index && <Divider />}
                    </>
                ))}
            </Menu>
        </div>
    )
}
