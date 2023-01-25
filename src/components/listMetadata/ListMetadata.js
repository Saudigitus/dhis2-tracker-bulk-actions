import React, { useState } from 'react'
import { useHeaderMetadata } from '../../hooks/index.js'
import { useMetadata } from '../../hooks/tableMetadata/useMetadata.js'
import Pagination from '../table/components/Pagination.js'
import WithBorder from '../table/components/WithBorder.js'
import WithPadding from '../tamplate/WithPadding.js'
import style from "./listcontent.module.css";
import Metadata from './Meta.js'

// eslint-disable-next-line react/prop-types
function ListMetadata({ resource }) {
  const [page, setpage] = useState(1)
  const [pageSize, setpageSize] = useState(10)
  const { headers = [], loading, } = useHeaderMetadata({ resource })
  // eslint-disable-next-line react/prop-types
  const { totalPages, loading: loadingHeader, columnData = [] } = useMetadata({ resource: resource.concat("s"), page, pageSize })

  const onPageChange = (event, newPage) => {
    setpage(newPage + 1)
  }

  const onRowsPerPageChange = (event) => {
    setpageSize(parseInt(event.target.value, 10))
    setpage(1)
  }
  console.log(columnData, headers);
  return (
    <>
      <WithBorder type={"bottom"}>
        <WithPadding p={"1.5em"}>
          <span className={style.event}>
            Metadata
          </span>
        </WithPadding>
      </WithBorder>
      <div
        style={{ padding: "1.5rem" }}
      >

        <WithBorder type={"all"}>
          <Metadata
            columnData={columnData}
            headers={headers}
            loading={loading}
            loadingHeader={loadingHeader}
          />

          <Pagination
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={pageSize}
            totalPages={totalPages}
            disable={loadingHeader}
          >
            Pagination
          </Pagination>
        </WithBorder>
      </div>
    </>
  )
}

export default ListMetadata