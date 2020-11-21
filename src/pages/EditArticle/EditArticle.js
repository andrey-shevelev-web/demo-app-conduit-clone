import { useEffect, useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import ArticleForm from 'components/ArticleForm/ArticleForm'
import useFetch from 'hooks/useFetch'
import { CurrentUserContext } from 'contexts/currentUser'

const EditArticle = ({ match }) => {
  const slug = match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl)
  const [{ response: updateArticleResponse, error: updateArticleError }, doUpdateArticle] = useFetch(apiUrl)
  const [initialValues, setInitialValues] = useState(null)
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const [currentUserState] = useContext(CurrentUserContext)

  console.log(currentUserState)

  const handleSubmit = article => {
    console.log('ha sub article', article)
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useEffect(() => {
    if (!fetchArticleResponse) {
      return
    }

    const { article: { title, description, body, tagList } } = fetchArticleResponse

    setInitialValues({
      title,
      description,
      body,
      tagList
    })
  }, [fetchArticleResponse])

  useEffect(() => {
    if (!updateArticleResponse) {
      return
    }

    setIsSuccessSubmit(true)
  }, [updateArticleResponse])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />
  }

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${slug}`} />
  }

  return (
    <div>
      <div>Edit Article...</div>
      <ArticleForm
        onSubmit={handleSubmit}
        errors={(updateArticleError && updateArticleError.errors) || {}}
        initialValues={initialValues}
      />
    </div>
  )
}

export default EditArticle
