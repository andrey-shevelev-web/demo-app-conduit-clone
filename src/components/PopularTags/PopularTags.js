import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useFetch from 'hooks/useFetch'
import Loading from 'components/Loading/Loading'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'

const PopularTags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch('/tags')

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (isLoading || !response) {
    return <Loading />
  }

  if (error) {
    return <ErrorBoundary />
  }

  return (
    <div className="sidebar">
      <p>Популярные теги</p>
      <div className="tag-list">
        { response.tags.map(tag => (
          <Link className="tag-default tag-pill"
            key={tag}
            to={`/tags/${tag}`}
          >
            {tag}
          </Link>
        ))}      
      </div>
    </div>
  )
}

export default PopularTags
