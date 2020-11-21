import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { range } from 'utils/utils'

const PaginationItem = ({ page, currentPage, url }) => {
  const liClasses = classNames({
    'page-item': true,
    'active': currentPage === page
  })

  return (
    <li className={liClasses}>
      <Link
        className="page-link" 
        to={`${url}?page=${page}`}
      >
        {page}
      </Link>
    </li>
  )
}

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total/limit)
  const pages = range(1, pagesCount)

  return (
    <ul className="pagination">
      {pages.map(page => (
        <PaginationItem
          key={page}
          page={page}
          currentPage={currentPage}
          url={url}
        />
      ))}
    </ul>
  )
}

export default Pagination
