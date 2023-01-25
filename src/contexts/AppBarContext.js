/* eslint-disable react/prop-types */
import React, { createContext } from "react";

const AppBarContext = createContext();

const AppBarProvider = ({ children }) => {
    return (
        <AppBarContext.Provider>
            {children}
        </AppBarContext.Provider>
    )
}

export { AppBarProvider, AppBarContext }
