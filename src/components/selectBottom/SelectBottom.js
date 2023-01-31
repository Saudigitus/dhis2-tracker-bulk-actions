import { Button, IconChevronDown16, IconChevronUp16, Tooltip } from '@dhis2/ui';
import { Popover } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState, useRef } from 'react'
import WithPadding from '../tamplate/WithPadding.js';
import ActiveFilterButton from './ActiveFilterButton.js';
import SelectorContents from './SelectorContents.js';

const getStyles = theme => ({
    icon: {
        fontSize: 20,
        paddingLeft: 5
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
        color: "secondary",
        '&:hover': {
            color: "primary"
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
    const { title, classes, colum, value } = props;
    const anchorRef = useRef(null)
    let activeFilterButtonInstance = useRef(null)
    const [selectorVisible, setselectorVisible] = useState(false)

    const closeFilterSelector = () => {
        setselectorVisible(false);
    }

    const onClose = () => {
        console.log("object");
        setselectorVisible(false);
    }

    const refActiveFilterInstance = (event) => {
        activeFilterButtonInstance = event;
    }

    const openFilterSelector = () => {
        // eslint-disable-next-line react/prop-types
        const { value } = props;
        setselectorVisible(true);

        // onmouseleave is sometimes triggered when the popover opens, and sometimes not triggered at all (not even when the mouse actually leaves the button). Clears the hover here to avoid it remaining hovered.
        if (value) {
            activeFilterButtonInstance && activeFilterButtonInstance.clearIsHovered();
        }
    }

    const handleClearFilter = () => {
        // eslint-disable-next-line react/prop-types
        const { itemId, onClearFilter } = props;
        onClearFilter(itemId);
    }

    const renderWithAppliedFilter = () => {
        // eslint-disable-next-line react/prop-types
        const { selectorVisible, classes, title, buttonText } = props;

        const arrowIconElement = selectorVisible ? (
            <span className={classes.icon}>
                <IconChevronUp16 />
            </span>
        ) : (
            <span className={classes.icon}>
                <IconChevronDown16 />
            </span>
        );

        return (
            <ActiveFilterButton
                innerRef={refActiveFilterInstance}
                onChange={openFilterSelector}
                onClear={handleClearFilter}
                iconClass={classes.icon}
                title={title}
                arrowIconElement={arrowIconElement}
                buttonText={buttonText}
            />
        );
    }

    const renderWithoutAppliedFilter = () => {
        // eslint-disable-next-line react/prop-types
        const { selectorVisible, classes, title, disabled, tooltipContent } = props;

        return disabled ? (
            <Tooltip content={tooltipContent} closeDelay={50}>
                {({ onMouseOver, onMouseOut, ref }) => (
                    <div
                        ref={(divRef) => {
                            if (divRef && disabled) {
                                divRef.onmouseover = onMouseOver;
                                divRef.onmouseout = onMouseOut;
                                ref.current = divRef;
                            }
                        }}
                    >
                        <Button disabled={disabled}>
                            {title}
                            <span className={classes.icon}>
                                {selectorVisible ? <IconChevronUp16 /> : <IconChevronDown16 />}
                            </span>
                        </Button>
                    </div>
                )}
            </Tooltip>
        ) : (
            <Button onClick={openFilterSelector}>
                {title}
                <span className={classes.icon}>
                    {selectorVisible ? <IconChevronUp16 /> : <IconChevronDown16 />}
                </span>
            </Button>
        );
    }

    return (
        <div style={{ padding: "0.25em 0.5em 0.25em 0em" }}>
            <div
                data-test="filter-button-popover-anchor"
                ref={anchorRef}
            >
                {value ? renderWithAppliedFilter() : renderWithoutAppliedFilter()}
            </div>
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
                                    <SelectorContents
                                        selectorVisible={selectorVisible}
                                        colum={colum}
                                        onClose={onClose}
                                    />
                                </WithPadding>
                            )
                        }
                        return null;
                    })()
                }
            </Popover>
        </div>
    )
}

export default withStyles(getStyles)(SelectButton)