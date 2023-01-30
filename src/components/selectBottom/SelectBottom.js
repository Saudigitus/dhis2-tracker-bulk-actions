import i18n from '@dhis2/d2-i18n';
import { IconChevronDown16, IconChevronUp16, Tooltip } from '@dhis2/ui';
import { Popover } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import createSvgIcon from '@material-ui/icons/utils/createSvgIcon';
import classNames from 'classnames';
import React, { useState, useRef } from 'react'
import ButtonComponent from '../buttons/Button.js';
import WithPadding from '../tamplate/WithPadding.js';
import SelectorContents from './SelectorContents.js';

const getStyles = theme => ({
    icon: {
        fontSize: theme.typography.pxToRem(20),
        paddingLeft: theme.typography.pxToRem(5)
    },
    inactiveFilterButton: {
        backgroundColor: '#f5f5f5'
    },
    inactiveFilterButtonLabel: {
        textTransform: 'none'
    },
    button: {
        backgroundColor: 'rgb(184, 215, 243) !important'
    },
    hovered: {
        backgroundColor: 'rgb(114, 176, 231) !important'
    },
    clearIcon: {
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.text.primary
        }
    }
});

const POPOVER_ANCHOR_ORIGIN = {
    vertical: 'bottom',
    horizontal: 'left',
};
const POPOVER_TRANSFORM_ORIGIN = {
    vertical: 'top',
    horizontal: 'left',
};


function SelectButton(props) {
    // eslint-disable-next-line react/prop-types
    const { title, classes, colum } = props;
    const anchorRef = useRef(null)
    const [openPopover, setopenPopover] = useState(false)
    const [selectorVisible, setselectorVisible] = useState(false)

    const closeFilterSelector = () => {
        setselectorVisible(!selectorVisible);
    }
    console.log(colum);

    return (
        <div ref={anchorRef} style={{ padding: "0.25em 0.5em 0.25em 0em" }}>
            <ButtonComponent {...props} onClick={() => setselectorVisible(!selectorVisible)}>
                {title}
                {selectorVisible ?
                    <span className={classes.icon}>
                        <IconChevronUp16 />
                    </span> :
                    <span className={classes.icon}>
                        <IconChevronDown16 />
                    </span>
                }
                <Popover
                    open={selectorVisible}
                    anchorEl={anchorRef.current}
                    onClose={closeFilterSelector}
                    anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                    transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                >
                    {
                        (() => {
                            if (selectorVisible) {
                                return (
                                    <WithPadding p={"1.5rem"}>
                                        <SelectorContents colum={colum} />
                                    </WithPadding>
                                )
                            }
                            return null;
                        })()
                    }
                </Popover>
            </ButtonComponent >
        </div>
    )
}

export default withStyles(getStyles)(SelectButton)