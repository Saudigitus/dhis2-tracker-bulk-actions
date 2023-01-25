
// eslint-disable-next-line max-params
export function customVerifying(programRule, programRuleVariables, type, values, variable) {
    let result = {};
    // console.log(programRule);
    // if (programRule.conditionType === "single") {
    for (const pVariable of programRule?.variables || []) {
        result = findStateVariable(
            programRuleVariables[pVariable.variable],
            pVariable.operator,
            variable,
            programRule
        )
    }
    // console.log(result);
    // } else {
    //     let 
    //     for (const pVariable of programRule?.variables || []) {
    //         result = findStateVariable(
    //             programRuleVariables[pVariable.variable],
    //             pVariable.operator,
    //             variable,
    //             programRule
    //         )
    //     }
    // }

    return result;
};

// "+", "-", "*", "/", "%", ">", ">=", "<", "<=", "==", "!=", "!"
// eslint-disable-next-line max-params
function findStateVariable(variable, operator, value, programRule) {
    // console.log(variable, operator, value, programRule);
    switch (operator) {
        case "!=":
            if (variable != value) {
                return { name: programRule.variable, visible: true };
            }
            return { name: programRule.variable, visible: false };
        case "==":
            if (variable == value) {
                return { name: programRule.variable, visible: true };
            }
            return { name: programRule.variable, visible: false };

        case ">=":
            if (variable >= value) {
                return { name: programRule.variable, visible: true };
            }
            return { name: programRule.variable, visible: false };
        case "<=":
            if (variable <= value) {
                return { name: programRule.variable, visible: true };
            }
            return { name: programRule.variable, visible: false };

        case "boolean":
            if (variable === value) {
                // console.log(variable, value);
                return { name: programRule.variable, visible: true };
            }
            return { name: programRule.variable, visible: false };

        default:
            return null;
    }
}