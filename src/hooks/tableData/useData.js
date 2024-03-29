import { useContext } from "react";
import { AppBarContext } from "../../contexts";
import { GeneratedVaribles } from "../../contexts/GeneratedVaribles";
// eslint-disable-next-line import/extensions
import { formatResponseData } from "../../utils/table/rows/formatResponseData";
import { useFetchData } from "../common/useFetchData.js";

const fieldsType = {
    WITH_REGISTRATION: "attributes[attribute,value],trackedEntityInstance,createdAt,enrollments[*]",
    WITHOUT_REGISTRATION: "event,dataValues[value,dataElement],trackedEntityInstance",
    QUERIES: "*"
}

const resourceType = {
    WITH_REGISTRATION: "trackedEntityInstances",
    WITHOUT_REGISTRATION: "events",
    QUERIES: "trackedEntityInstances/query",
}

const paramsType = ({ ou, program, programStage, page, pageSize, programStatus,
    todayData, filters, filtro, order,
    enrollmentEnrolledAfter, enrollmentEnrolledBefore }) => ({
        WITH_REGISTRATION: {
            ou: ou || undefined,
            // ouMode: ou ? "DESCENDANTS" : "ACCESSIBLE",
            order: order,
            attribute: filters,
            filter: filtro.length > 0 ? [filtro] : undefined,
            program,
            pageSize: pageSize,
            page: page,
            // totalPages: true,
            programStatus: programStatus || undefined,
            startDate: enrollmentEnrolledBefore || undefined,
            endDate: enrollmentEnrolledAfter || undefined,
        },
        QUERIES: {
            ou: ou || undefined,
            // ouMode: ou ? "DESCENDANTS" : "ACCESSIBLE",
            order: order,
            attribute: filters,
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


export const useData = ({ type, ou, program, page, pageSize, todayData, filters, programStatus }) => {

    const { filter } = useContext(AppBarContext);
    const { order, orderBy, enrollmentDate } = useContext(GeneratedVaribles);

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
        order: `${orderBy ? orderBy : type === "WITH_REGISTRATION" ?
            "created" :
            "eventDate"}:${order}`,
        enrollmentEnrolledBefore: enrollmentDate?.endDate,
        enrollmentEnrolledAfter: enrollmentDate?.startDate
    }),)

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