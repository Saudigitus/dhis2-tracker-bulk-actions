

export function formatProgramRules(programRules) {
    const programRulesResponses = [];
    for (const prules of programRules || []) {

        for (const pRulesAction of prules.programRuleActions) {
            programRulesResponses.push({
                condition: prules.condition,
                programRuleActionType: pRulesAction.programRuleActionType,
                variable: pRulesAction?.dataElement?.id || pRulesAction?.trackedEntityAttribute?.id || pRulesAction?.programStageSection?.id,
                type: pRulesAction?.dataElement?.id && "dataElement" || pRulesAction?.trackedEntityAttribute?.id && "attribute" || pRulesAction?.programStageSection?.id && "section",
            })
        }
    }

    return programRulesResponses;
}

export function formatProgramRuleVariables(programRuleVariables) {
    const programRuleVariablesResponses = {};

    for (const pRulesVariable of programRuleVariables || []) {
        programRuleVariablesResponses[pRulesVariable?.name.trim()] = pRulesVariable?.dataElement?.id || pRulesVariable?.trackedEntityAttribute?.id
    }

    return programRuleVariablesResponses;
}