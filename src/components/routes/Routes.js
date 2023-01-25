import React from 'react'
import { Routes, Route } from 'react-router-dom'
// eslint-disable-next-line import/extensions
import { routesList } from './RoutesList'

function RoutesComponent() {
    return (
        <Routes>
            {routesList.map((route, index) => (
                <>
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.layout>
                                <route.Component />
                            </route.layout>
                        }
                    />
                </>
            ))}
        </Routes>
    )
}

export default RoutesComponent
