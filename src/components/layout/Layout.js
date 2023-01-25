/**
 * //TODO
 * @EdsonNhancale
 * We must change the way we connect the routes with the layout.
 * If there is another component that needs to use another layout type, we will have to rewrite a layout component just like this one.
 * remove the routes for this component and use Outlet from react-router-dom instead
 *
 * it will look like
 *
 * <container>
 *    <sidebar>
 *    <Outlet/>
 * </container>
 *
 * Enhance this component
 */

import React from 'react'
import { HashRouter } from 'react-router-dom'
// eslint-disable-next-line import/extensions
import { Routes } from '../routes'
// eslint-disable-next-line import/extensions
import styles from './Layout.module.css'




function Layout() {
    return (
        <HashRouter>
            <div className={styles.container}>
                <div className={styles.right}>
                    <div className={styles.contentWrapper}>
                        <Routes />
                    </div>
                </div>
            </div>
        </HashRouter>
    )
}

export default Layout