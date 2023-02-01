import { Button } from '@dhis2/ui';
import { withStyles } from '@material-ui/core';
import React from 'react'
import FIlterComponent from './FIlterComponent';


const getStyles = (theme) => ({
    buttonsContainer: {
        paddingTop: theme.typography.pxToRem(8),
    },
    buttonContainer: {
        paddingRight: theme.typography.pxToRem(8),
        display: 'inline-block',
    },
});


function SelectorContents(props) {
    // eslint-disable-next-line react/prop-types
    const { classes, disabledUpdate, onClose, disabledReset, onRemove, isRemovable, colum, onChange, value } = props;

    
    return (
        <>
            <FIlterComponent
                type={colum.valueType}
                column={colum}
                onChange={onChange}
                value={value}
                {...props}
            />
            <div
                className={classes.buttonsContainer}
            >
                <div
                    className={classes.buttonContainer}
                >
                    <Button
                        primary
                        // onClick={this.handleUpdateClick}
                        disabled={disabledUpdate}
                    >
                        {('Update')}
                    </Button>
                </div>
                <div
                    className={classes.buttonContainer}
                >
                    <Button
                        dataTest="list-view-filter-cancel-button"
                        secondary
                        onClick={onClose}
                        disabled={disabledReset}

                    >
                        {('Reset filter')}
                    </Button>
                </div>
                {isRemovable &&
                    (<div
                        className={classes.buttonContainer}
                    >
                        <Button
                            dataTest="list-view-filter-remove-button"
                            destructive
                            onClick={onRemove}
                        >
                            {('Remove filter')}
                        </Button>
                    </div>)
                }
            </div>
        </>
    )
}

export default withStyles(getStyles)(SelectorContents)