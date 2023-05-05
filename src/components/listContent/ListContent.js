import React, { useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppBarContext } from '../../contexts/AppBarContext.js'
import { GeneratedVaribles } from '../../contexts/GeneratedVaribles.js'
import { useParams } from '../../hooks/common/useQueryParams.js'
import { useGetOptionSets } from '../../hooks/optionSets/useGetOptionSets.js'
import { useData } from '../../hooks/tableData/useData.js'
import { useHeader } from '../../hooks/tableHeader/useHeader.js'
import TranferEnrollment from '../modal/TranferEnrollment.js'
import Pagination from '../table/components/Pagination.js'
import WithBorder from '../table/components/WithBorder.js'
import WithPadding from '../tamplate/WithPadding.js'
import Content from './Content.js'
import OtherFilters from './filter/other/OtherFilters.js'
import style from "./listcontent.module.css";
import { ConfirmBulkAction } from '../modal/ConfirmBulkAction.js'

// eslint-disable-next-line react/prop-types
function ListContent({ type, program }) {
  const { order, orderBy, setreloadData, reloadData, setallTeisFormated, enrollmentDate, selectRows = [], setselectRows, programs = [], allTeisFormated } = useContext(GeneratedVaribles)
  const { filter } = useContext(AppBarContext);

  const [selectedFilter, setselectedFilter] = useState("")
  const [controlRenderOptions, setcontrolRenderOptions] = useState(true)
  const { remove } = useParams()

  const [openModalBulk, setopenModalBulk] = useState(false)
  const [openModalConfirmBulk, setOpenModalConfirmBulk] = useState(false)
  const handleCloseConfirmAction = () => setOpenModalConfirmBulk(false);
  const [searchParams] = useSearchParams();
  const programId = searchParams.get("programId")
  const ouName = searchParams.get("ouName")
  const selectedOu = searchParams.get('ou');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const [page, setpage] = useState(1)
  const [pageSize, setpageSize] = useState(10)
  const [modalType, setmodalType] = useState("transfer")
  const { headers = [], loading, getData: getDataHeader } = useHeader({ type, program })
  const { totalPages, loading: loadingHeader, columnData, getData } = useData({ type, ou: selectedOu, program, programStatus: selectedFilter, page, pageSize })

  const optionSets = headers.filter(x => x.optionSet)?.map(x => x.optionSet);

  const { getOptionsByOptionSet, loading: loadingOptionSet } = useGetOptionSets()

  const onPageChange = (newPage) => {
    setpage(newPage)
  }

  const onRowsPerPageChange = (event) => {
    setpageSize(parseInt(event.value, 10))
    setpage(1)
  }

  const onFilterByEnrollment = (value) => {
    setselectedFilter(value)
  }

  function removeDuplicates(arr) {
    return arr.filter((item,
      index) => arr.indexOf(item) === index);
  }

  useEffect(() => {
    if (optionSets?.length > 0 && controlRenderOptions) {
      setcontrolRenderOptions(false)
      getOptionsByOptionSet(removeDuplicates(optionSets))
    }
  }, [headers])

  useEffect(() => {
    getDataHeader()
  }, [program])

  useEffect(() => {
    setallTeisFormated(columnData)
  }, [loadingHeader])

  useEffect(() => {
    if (searchParams.has("reload")) {
      remove("reload")
    }
  }, [columnData])

  useEffect(() => {
    if (!loadingHeader) {
      getData()
      setreloadData(false)
    }
  }, [endDate, startDate, selectedOu, order, orderBy, reloadData, page, pageSize, filter, searchParams.get("reload"), selectedFilter, enrollmentDate])

  function nameOfTEIType() {
    return `${programs.find(x => x.value === programId)?.trackedEntityType?.name}(s)` || ""
}

function currentDetailsProgram() {
    return programs.find(x => x.value === programId)
}

function getTeiDetails() {
  const teisSelected = []
  for (const tei of selectRows) {
      const selectedTei = allTeisFormated.find(x => x.id === tei)

      const teiData = `${currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.displayName}: ${selectedTei?.[currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[0]?.trackedEntityAttribute?.id]};${currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.displayName}: ${selectedTei?.[currentDetailsProgram().trackedEntityType?.trackedEntityTypeAttributes?.[1]?.trackedEntityAttribute?.id]}`
      teisSelected.push({ id: tei, name: teiData, isSelected: true })

  }
  return teisSelected
}
const selectedTeis = getTeiDetails(currentDetailsProgram())

  return (
    <>
      {type === "WITHOUT_REGISTRATION" &&
        <WithBorder type={"bottom"}>
          <WithPadding p={"1.5em"}>
            <span className={style.event}>
              Registered events
            </span>
          </WithPadding>
        </WithBorder>
      }
      <div
        style={{ padding: "1.5rem" }}
      >
        <WithBorder type={"all"}>
          {type === "WITH_REGISTRATION" &&
            <WithBorder type={"bottom"}>
              <WithPadding>
                <OtherFilters
                  onFilterByEnrollment={onFilterByEnrollment}
                  selectedFilter={selectedFilter}
                  setopenModalBulkTranfer={setopenModalBulk}
                  setopenModalBulkDelete={setOpenModalConfirmBulk}
                  modalType={setmodalType}
                  disableDelete={!selectRows.length}
                  />
              </WithPadding>
            </WithBorder>
          }

          <Content
            columnData={columnData}
            headers={headers}
            loading={loading}
            loadingHeader={loadingHeader}
            loadingOptionSet={loadingOptionSet}
            type={type}
          />
          <Pagination
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={pageSize}
            totalPages={totalPages}
            disable={loadingHeader}
            totalPerPage={columnData?.length}
          >
            Pagination
          </Pagination>
        </WithBorder>
      </div>
      {modalType === "transfer" &&
        openModalBulk &&
        <TranferEnrollment
          modalType={modalType}
          open={openModalBulk}
          setopen={setopenModalBulk}
          selectedTeis={selectedTeis}
          nameOfTEIType={nameOfTEIType}
          currentDetailsProgram={currentDetailsProgram}
        />
      }

      {modalType === 'delete' && openModalConfirmBulk && (
        <ConfirmBulkAction
          modalType={modalType}
          show={openModalConfirmBulk}
          handleClose={handleCloseConfirmAction}
          action={handleCloseConfirmAction}
          loading={loading}
          selectRows={selectRows}
          setselectRows={setselectRows}
          selectedTeis={selectedTeis}
          nameOfTEIType={nameOfTEIType}
          ouName={ouName}
          label={"Delete"}
        />
      )}        
    </>
  )
}

export default ListContent