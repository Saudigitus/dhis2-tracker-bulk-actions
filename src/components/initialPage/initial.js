import { Paper } from '@material-ui/core'
import React from 'react'
import styles from './initial.module.css'

export default function InitialComponent() {
    return (
        <div className={styles.containerInit}>
            <Paper elevation={1} className={styles.paperInit}>
                <h2>Tracker Bulk Actions</h2>
                <span>Follow the instructions to proceed:</span>
                <ul>
                    <li className={styles.paperOtherText}>Select the  Organization unit you want to view data</li>
                    <li className={styles.paperOtherText}>Select the  Program to perform the operations</li>
                </ul>
                <span>How to perform operations:</span>
                <ul>
                    <li className={styles.paperOtherText}><strong>Delete TEI:</strong> select the entities in the table then select the action at the end confirm.</li>
                    <li className={styles.paperOtherText}><strong>Change Status:</strong> select the initial status of the entities in the table then select the entities and the action at the end confirm the enrollment date for each instances.</li>
                    <li className={styles.paperOtherText}><strong>Temporary Transfer:</strong> select the entities in the table then select the action at the end confirm.</li>
                    <li className={styles.paperOtherText}><strong>Permanent Transfer:</strong> select the entities in the table then select the action at the end confirm.</li>
                    <li className={styles.paperOtherText}><strong>Enroll in different Program:</strong> select the entities in the table then select the action at the end confirm.</li>
                </ul>
            </Paper>
        </div>
    )
}
