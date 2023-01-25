// eslint-disable-next-line max-params


// eslint-disable-next-line max-params
export function modifySection(programRuleActionType, condition, variable, sectionvaribles) {
    // console.log(programRuleActionType);
    for (const section of sectionvaribles) {

        if (programRuleActionType === "HIDEFIELD") {
            for (const dataElement of section.dataElements || []) {
                if (eval(condition)) {
                    if (dataElement.name === variable) {
                        dataElement.visible = false;
                    }
                } else {
                    if (dataElement.name === variable) {
                        dataElement.visible = true;
                    }
                }
                // console.log(dataElement)
            }
        }
        else if (programRuleActionType === "HIDESECTION") {
            if (eval(condition)) {
                if (section.name === variable) {
                    section.visible = false;
                }
            } else {
                if (section.name === variable) {
                    section.visible = true;
                }
            }

        }
    }

    // return sectionvaribles;
}
