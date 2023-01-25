import { customVerifying } from "./rulesVarying.js";

export function typesOfRules(props) {
    const { variables, variable, programRules, programRuleVariables, values } = props;
    // console.log(programRules.filter(x => x.conditionType === "single"))
    let result = "";
    let type = "";
    const localVariable = [...variables]


    for (const programRule of programRules.filter(x => (x?.programRuleActionType != "ERRORONCOMPLETE")) || []) {
        if (programRule.programRuleActionType === "HIDEFIELD") {
            type = "HIDEFIELD"
            result = customVerifying(programRule, programRuleVariables, "HIDEFIELD", values, variable);
            programRuleActionTypes(result, type, localVariable);
        }
        // else if (programRule.programRuleActionType === "HIDESECTION") {
        //     console.log(programRule);
        //     type = "HIDESECTION"
        //     result = customVerifying(programRule, programRuleVariables, "HIDESECTION", values, variable);
        //     programRuleActionTypes(result, type, localVariable);
        // }
    }

    // console.log(localVariable);

    return result;

};


function programRuleActionTypes(value, type, localVariable) {
    // console.log(value, type, variables);

    for (const variable of localVariable) {
        // if (variable.type === "dataElement") {
        if (type === "HIDEFIELD") {
            for (const dataElement of variable.dataElements || []) {
                if (typeof value !== "undefined") {
                    // console.log(value, type, localVariable);
                    if (dataElement.name === value?.name) {
                        dataElement.visible = value?.visible;
                    }
                }
            }
        }
        else if (type === "HIDESECTION") {
            if (typeof value !== "undefined") {
                // console.log(value, variable);
                variable.visible = value?.visible;
            }

        }
    }

    // console.log(value)
}