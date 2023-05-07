import { Paper } from '@material-ui/core'
import React from 'react'
import styles from './initial.module.css'

export default function InitialComponent() {
    return (
        <div className={styles.containerInit}>
            <Paper elevation={1} className={styles.paperInit}>
                <h1>Tracker Bulk Actions</h1>
                <span>Follow the instructions to proceed:</span>
                <ul>
                    <li>Select the <strong> Organization unit</strong> you want to view data</li>
                    <li>Select the <strong> Program</strong> to perform the operations</li>
                </ul>
            </Paper>  
        </div>
    )
}
