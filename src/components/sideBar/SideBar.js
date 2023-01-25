import React from 'react'
// eslint-disable-next-line import/extensions
import { Menu } from '../menu'
// eslint-disable-next-line import/extensions
import { NavigationItem } from '../navigation'
// eslint-disable-next-line import/extensions
import { routesList } from '../routes'

/**
 * //TODO: @EdsonNhancale
 * change all layout component fragment(sidebar, navbar, footer) to folder /component/common/layout
 * change variables name to somethig more explanatory. In this component case ex: x -> intem
 */ 

function SideBar() {
    return (
        <Menu>
            {routesList.sort((a, b) => a.label - b.label).map(x =>
                <NavigationItem
                    key={x.path}
                    // Menu item for the home page
                    label={x.label}
                    path={x.path}
                />
            )}
        </Menu>
    )
}

export default SideBar