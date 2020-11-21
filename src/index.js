import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from 'Routes/Routes'
import TopBar from 'components/TopBar/TopBar'
import { CurrentUserProvider } from 'contexts/currentUser'
import CurrentUserChecker from 'components/CurrentUserChecker/CurrentUserChecker'

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
