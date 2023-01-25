import { useContext, useEffect } from "react";
import { AppBarContext } from "../../contexts";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles";
import { formaterToIsoDate } from "../../utils/commons/dateFormatter";
// eslint-disable-next-line import/extensions
import { formatResponseData } from "../../utils/table/rows/formatResponseData";
import { useFetchData } from "../common/useFetchData.js";

const fieldsType = {
    WITH_REGISTRATION: "attributes[attribute,value],trackedEntityInstance,created",
    WITHOUT_REGISTRATION: "event,dataValues[value,dataElement],trackedEntityInstance",
    QUERIES: "*"
}

//filter=Redsyjfv004:LIKE:Celso

const resourceType = {
    WITH_REGISTRATION: "trackedEntityInstances",
    WITHOUT_REGISTRATION: "events",
    QUERIES: "trackedEntityInstances/query",
}

const today = formaterToIsoDate(new Date())
const paramsType = ({ ou, program, programStage, page, pageSize, programStatus, todayData, filters, filtro, order }) => ({
    WITH_REGISTRATION: {
        ou: ou || undefined,
        ouMode: ou ? "DESCENDANTS" : "ACCESSIBLE",
        order: 'created:desc',
        attribute: filters,
        //programEnrollmentStartDate: today,
        programEnrollmentEndDate: today,
        filter: filtro,
        program,
        pageSize: pageSize,
        page: page,
        totalPages: true,
        programStatus: programStatus || undefined
    },
    QUERIES: {
        ou: ou || undefined,
        ouMode: ou ? "DESCENDANTS" : "ACCESSIBLE",
        order: 'created:desc',
        attribute: filters,
        //programEnrollmentStartDate: today,
        programEnrollmentEndDate: today,
        program,
        paging: false
    },
    WITHOUT_REGISTRATION: {
        orgUnit: ou || undefined,
        programStage: programStage || undefined,
        // ouMode: ou ? "DESCENDANTS" : "ACCESSIBLE",
        ouMode: "SELECTED",
        order: order,
        program,
        pageSize: pageSize,
        page: page,
        // totalPages: true,
        filter: filtro,
    }
})


const resourceTypes = (props) => ({
    resource: resourceType[props?.type],
    fields: fieldsType[props?.type],
    variables: { id: props?.id },
    params: paramsType(props)[props?.type]
})


export const useData = ({ type, ou, program, programStatus = undefined, page, pageSize, todayData, filters }) => {

    const { filter } = useContext(AppBarContext);
    const { order, orderBy } = useContext(GeneratedVaribles);

    const { error, loading, objects, validationText, getData, totalPages, allData } = useFetchData(resourceTypes({
        type,
        ou,
        program,
        page,
        pageSize,
        programStatus,
        todayData,
        filters,
        filtro: filter,
        order: `${orderBy}:${order}`
    }), )

    return {
        columnData: formatResponseData(type, objects),
        error,
        loading,
        data: objects,
        validationText,
        page,
        pageSize,
        totalPages,
        allData,
        getData
    }
}