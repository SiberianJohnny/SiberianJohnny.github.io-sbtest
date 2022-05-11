import React from 'react'
import './pagination.scss'

export default function pagination({ rowsPerPage, totalRows, currentPage, paginate, prevButton, nextButton }) {
  const pageNumbers = [];
  const linksToShow = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i)
  }

  for (let i = pageNumbers[currentPage - 1]; i < currentPage + 5; i++) {
    linksToShow.push(i)
  }

  return (
    <nav className='pagination'>
      <a href="#" className='pagination__button' onClick={(e) => prevButton(e)}>Назад</a>
      <ul className='pagination__list'>
        {linksToShow.map(number => (
          <li key={number} className='pagination__item'>
            <a href={number} className='pagination__item_link' onClick={(e) => paginate(number, e)}>{number}</a>
          </li>
        ))}
      </ul>
      <a href="#" className='pagination__button' onClick={(e) => nextButton(e)}>Далее</a>
    </nav >
  )
}
