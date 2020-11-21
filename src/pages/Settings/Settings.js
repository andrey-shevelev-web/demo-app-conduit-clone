import { Redirect } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'

import BackendErrorMessages from 'components/BackendErrorMessages/BackendErrorMessages'
import useFetch from 'hooks/useFetch'
import useLocalStorage from 'hooks/useLocalStorage'
import { CurrentUserContext } from 'contexts/currentUser'

const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  const apiUrl = '/user'
  const [{ response, error }, doFetch] = useFetch(apiUrl)
  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useLocalStorage('token')
  const [isSuccessLogout, setIsSuccessLogout] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()

    doFetch({
      method: 'put',
      data: {
        ...currentUserState.currentUser,
        image,
        username,
        bio,
        email,
        password
      }
    })
  }

  const handleLogout = event => {
    event.preventDefault()
    setToken('')
    dispatch({
      type: 'LOGOUT'
    })
    setIsSuccessLogout(true)
  }

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return
    }

    const { currentUser: { image, username, bio, email, password } } = currentUserState
    
    setImage(image)
    setUsername(username)
    setBio(bio)
    setEmail(email)
  }, [currentUserState.currentUser])

  useEffect(() => {
    if (!response) {
      return
    }

    dispatch({
      type: 'SET_AUTHORIZED',
      payload: response.user
    })

  }, [response, dispatch])

  if (isSuccessLogout) {
    return <Redirect to="/" />
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg"
                    rows="8" placeholder="Short bio about you"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  ></textarea>
                </fieldset>

                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input type="password" className="form-control form-control-lg"
                    placeholder="New Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>

                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
