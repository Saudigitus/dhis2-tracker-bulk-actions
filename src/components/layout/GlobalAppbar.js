import React from 'react'
import AppBar from '../headers/AppBar'


const GlobalLayout = ({ children }) => {    

    return (
        <div>
            <AppBar />
            {children}
        </div>
    )
}

const TEILayout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export { GlobalLayout, TEILayout }
