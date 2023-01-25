import { modifySection } from "./modifySection.js";
import { existValue } from "./programRulesUtils.js";

// eslint-disable-next-line max-params
export function replaceToEspecifiValue(programRule, variables, values, sectionvaribles) {
    const localPR = programRule;
    let exist = false;
    for (const variable of Object.keys(variables)) {
        if (localPR.condition.includes(variable.trim())) {
            localPR.condition = localPR.condition.replaceAll(variable.trim(), existValue(values, variables, variable))
                .replaceAll("d2:hasValue", "")
                .replaceAll("#{", "")
                .replaceAll("A{", "")
                .replaceAll("}", "")
                .replaceAll("}", "")
                .replaceAll("falseDe", "false")
                .replaceAll("'undefined'De", "'undefined'");

            exist = true;
        }
        // console.log(existValue(values, variables, variable));
    }
    if (exist) {
        modifySection(localPR.programRuleActionType, localPR.condition, localPR.variable, sectionvaribles);
    }

    // console.log(eval(condition));
    // return sectionvaribles;
}
