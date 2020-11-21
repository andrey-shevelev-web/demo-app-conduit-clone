import { useEffect } from 'react'
import { stringify } from 'query-string'

import useFetch from 'hooks/useFetch'
import Feed from 'components/Feed/Feed'
import Pagination from 'components/Pagination/Pagination'
import PopularTags from 'components/PopularTags/PopularTags'
import Loading from 'components/Loading/Loading'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import FeedToggler from 'components/FeedToggler/FeedToggler'
import { getPaginator, limit } from 'utils/utils'

const YourFeed = ({ location, match }) => {
  const { currentPage, offset } = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset
  })
  const apiUrl = `/articles/feed?${stringifiedParams}`
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
  const url = match.url

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />

            {isLoading && <Loading/>}
            {error && <ErrorBoundary />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles}/>
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourFeed
