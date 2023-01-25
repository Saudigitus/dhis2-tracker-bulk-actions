import i18n from '@dhis2/d2-i18n';
import { IconChevronDown16, IconChevronUp16, Tooltip } from '@dhis2/ui';
import { withStyles } from '@material-ui/core/styles';
import createSvgIcon from '@material-ui/icons/utils/createSvgIcon';
import classNames from 'classnames';
import React, { useState } from 'react'
import ButtonComponent from '../buttons/Button.js';

const ClearIcon = createSvgIcon(<React.Fragment>
    <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
</React.Fragment>, 'CloseCircle');

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

function SelectButton(props) {
    // eslint-disable-next-line react/prop-types
    const { title, classes } = props;
    const buttonClasses = classNames(classes.button);

    const [selectorVisible, setselectorVisible] = useState(false)

    return (
        <div style={{ padding: "0.25em 0.5em 0.25em 0em" }}>
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
                {/* <Tooltip title={i18n.t('Clear')} placement={'bottom'} enterDelay={300}>
                <ClearIcon
                    className={classNames(classes.icon, classes.clearIcon)}
                // onClick={this.handleClearClick}
                />
            </Tooltip> */}
            </ButtonComponent >
        </div>
    )
}

export default withStyles(getStyles)(SelectButton)