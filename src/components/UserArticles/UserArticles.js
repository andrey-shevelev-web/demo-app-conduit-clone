import { useEffect } from 'react'
import { stringify } from 'query-string'

import { getPaginator, limit } from 'utils/utils'
import useFetch from 'hooks/useFetch'
import Loading from 'components/Loading/Loading'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import Feed from 'components/Feed/Feed'
import Pagination from 'components/Pagination/Pagination'

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {limit, offset, favorited: username}
    : {limit, offset, author: username}

  return `/articles?${stringify(params)}`
}

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search)
  const apiUrl = getApiUrl({username, offset, isFavorites})
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  console.log('ua res:', response)

  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites])

  return (
    <div className="container">
      {isLoading && <Loading />}
      {error && <ErrorBoundary />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  )
}

export default UserArticles
