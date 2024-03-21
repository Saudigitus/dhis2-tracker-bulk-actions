
export function get2AttributeTei(tei, program) {
    const id1 = program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id || program.programTrackedEntityAttributes?.[0]?.trackedEntityAttribute?.id || "Variable not defined"
    const id1Name = program.trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName || program.programTrackedEntityAttributes?.[0]?.trackedEntityAttribute?.displayName 
    const id2 = program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id || program.programTrackedEntityAttributes?.[1]?.trackedEntityAttribute?.id || "Variable not defined"
    const id2Name = program.trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName || program.programTrackedEntityAttributes?.[1]?.trackedEntityAttribute?.displayName 

    return (`${id1Name}: ${tei?.[id1] || "---"};${id2Name}: ${tei?.[id2] || "---"}`)
}