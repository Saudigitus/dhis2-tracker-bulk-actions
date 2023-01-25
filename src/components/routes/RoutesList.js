/* eslint-disable import/namespace */
// eslint-disable-next-line import/extensions
import { Navigate } from "react-router-dom";
import {Details, List as Home} from "../../pages";
import { GlobalLayout } from "../layout";
// eslint-disable-next-line import/extensions

/**
 * //TODO: @EdsonNhancale
 * We should have a way to pass the layout and maybe later, the roles and permissions that a list of routes will use.
 * to make easier the map in the routes
 *
 * without roles, it will look like this:
 *
 */

export const routesList = [
    {
        label: "Home",
        path: "/",
        icon: "",
        layout: GlobalLayout,
        Component: ()=> <Navigate to="/home" replace={true}/>
    },
    {
        label: "Home",
        path: "/home",
        icon: "",
        layout: GlobalLayout,
        Component: Home
    },
    {
        label: "Details",
        path: "/details",
        icon: "",
        layout: GlobalLayout,
        Component: Details
    },
]