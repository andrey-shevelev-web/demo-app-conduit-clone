import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import useLocalStorage from 'hooks/useLocalStorage'

const useFetch = url => {
  const baseUrl = 'https://conduit.productionready.io/api'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    let skipGetRespAfterDestroy = false
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }
    
    if (!isLoading) {
      return
    }
    axios(`${baseUrl}${url}`, requestOptions)
    .then(res => {
      if (!skipGetRespAfterDestroy) {
        setIsLoading(false)
        setResponse(res.data)  
      }
    })
    .catch(error => {
      if (!skipGetRespAfterDestroy) {
        setIsLoading(false)
        setError(error.response.data)  
      }
    })
    
    return () => {
      skipGetRespAfterDestroy = true
    }
  }, [isLoading, options, url, token])
  
  return [{ isLoading, response, error }, doFetch]
}

export default useFetch
