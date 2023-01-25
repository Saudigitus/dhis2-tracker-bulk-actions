//TODO: must be optimized

import { replaceToEspecifiValue } from "./replaceToEspecifiValue.js";

// eslint-disable-next-line max-params
export function programRulesUtilsSection(sectionvaribles, values, programRules, programRuleVariables) {

    for (const programRule of programRules || []) {
        replaceToEspecifiValue(programRule, programRuleVariables, values, sectionvaribles)
    }

    return sectionvaribles;
}


export function existValue(values, variables, variable) {
    // console.log(values, variables, variable);
    // eslint-disable-next-line no-prototype-builtins
    if (values.hasOwnProperty(variables[variable])) {
        if (values[variables[variable]] != false) {

            return `'${values[variables[variable]]}'`
        }
    }
    return false;
}


