import { Button, Tooltip } from '@dhis2/ui'
import createSvgIcon from '@material-ui/icons/utils/createSvgIcon';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useState } from 'react'

const ClearIcon = createSvgIcon(
    <React.Fragment>
        <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </React.Fragment>,
    'CloseCircle',
);

const getStyles = (theme) => ({
    button: {
        backgroundColor: 'rgb(184, 215, 243) !important',
    },
    hovered: {
        backgroundColor: 'rgb(114, 176, 231) !important',
    },
    clearIcon: {
        color: "secondary",
        '&:hover': {
            color: "primary",
        },
    },
});
const MAX_LENGTH_OF_VALUE = 10;
function ActiveFilterButton(props) {
    // eslint-disable-next-line react/prop-types
    const { onChange, classes, iconClass, title, arrowIconElement, buttonText, onClear } = props
    const [isHovered, setisHovered] = useState(false)

    const buttonClasses = classNames(classes.button, { [classes.hovered]: isHovered });

    const setIsHovered = () => {
        setisHovered(true);
    }

    const clearIsHovered = () => {
        setisHovered(false);
    }

    const handleClearClick = () => {
        onClear();
    }

    const getCappedValue = (value) => {
        const cappedValue = value.substring(0, MAX_LENGTH_OF_VALUE - 3).trimRight();
        return `${cappedValue}...`;
    }

    const getViewValueForFilter = (buttonText) => {
        const calculatedValue = buttonText.length > MAX_LENGTH_OF_VALUE ? getCappedValue(buttonText) : buttonText;
        return `: ${calculatedValue}`;
    }

    return (
        <div
            onMouseEnter={setIsHovered}
            onMouseLeave={clearIsHovered}
        >
            <Button
                className={buttonClasses}
                onClick={onChange}
            >
                {title}
                {getViewValueForFilter(buttonText)}
                {arrowIconElement}
                <Tooltip
                    content={('Clear')}
                    placement={'bottom'}
                    openDelay={300}
                >
                    <ClearIcon
                        onMouseEnter={clearIsHovered}
                        onMouseLeave={setIsHovered}
                        className={classNames(iconClass, classes.clearIcon)}
                        onClick={handleClearClick}

                    />
                </Tooltip>
            </Button>
        </div>
    )
}

export default withStyles(getStyles)(ActiveFilterButton) 