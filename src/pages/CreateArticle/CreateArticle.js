import { useEffect, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import ArticleForm from 'components/ArticleForm/ArticleForm'
import useFetch from 'hooks/useFetch'
import { CurrentUserContext } from 'contexts/currentUser'

const CreateArticle = () => {
  const [currentUserState] = useContext(CurrentUserContext)
  const apiUrl = '/articles'
  const [{ response, error }, doFetch] = useFetch(apiUrl)
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)

  const handleSubmit = article => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }

    setIsSuccessSubmit(true)
  }, [response])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />
  }

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  )
}

export default CreateArticle
