import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { fetchTable, filterTable } from '../../store/actions/tableActions';
import Search from '../Search/Search';
import './table.scss';

const Table = () => {
  //Table Data
  const tableHeadings = [
    { field: 'id', name: 'ID' },
    { field: 'title', name: 'Заголовок' },
    { field: 'body', name: 'Описание' }
  ]
  const tableState = useSelector((state) => (state.tableSortReducer))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTable());
  }, []);

  //Sorting
  const [sortConfig, setSortConfig] = useState('')

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  useMemo(() => {
    if (sortConfig !== null) {
      tableState.tableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
  }, [tableState, sortConfig])

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableState.tableData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber, e) => {
    e.preventDefault()
    setCurrentPage(pageNumber)
  }

  const prevButtonHandler = (e) => {
    e.preventDefault()
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const nextButtonHandler = (e) => {
    e.preventDefault()
    if (currentPage < Math.ceil(tableState.tableData.length / rowsPerPage))
      setCurrentPage(prev => prev + 1)
  }


  return (
    <div className='table__wrapper'>
      <Search />
      <table className='table'>
        <thead className='table__header'>
          <tr>
            {tableHeadings.map(item =>
              <th className={`table__column_${item.field} table__heading`} key={item.field} onClick={() => requestSort(item.field)}>{item.name}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableState.tableData && currentRows.map(item =>
            <tr key={item.id}>
              <td className='table__cell'>{item.id}</td>
              <td className='table__cell'>{item.title}</td>
              <td className='table__cell'>{item.body}</td>
            </tr>
          )
          }
        </tbody>
      </table>
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={tableState.tableData.length}
        currentPage={currentPage}
        paginate={paginate}
        prevButton={prevButtonHandler}
        nextButton={nextButtonHandler}
      />
    </div>
  )
}

export default Table;