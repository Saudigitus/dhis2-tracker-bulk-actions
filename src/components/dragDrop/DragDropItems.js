
import { Checkbox, IconReorder24 } from '@dhis2/ui';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import React from 'react'


const style = {
    outline: 'none'
};


function DragDropItems(props) {

    return (
        <tr key={props.id} tabIndex={-1} style={{
            ...style
        }}>
            <TableCell component="th" scope="row">
                <Checkbox
                    checked={props.visible}
                    tabIndex={-1}
                    onChange={() => props.handleToggle(props.id)}
                    label={props.text}
                    className={props.classes.checkbox}
                    valid dense />
            </TableCell>
            <TableCell>
                <span style={{
                    float: 'right'
                }}>
                    <IconReorder24 />
                </span>
            </TableCell>
        </tr>
    )
}

export default withStyles(style)(DragDropItems)