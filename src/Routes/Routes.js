import { Switch, Route } from 'react-router-dom'

import Article from 'pages/Article/Article'
import GlobalFeed from 'pages/GlobalFeed/GlobalFeed'
import TagFeed from 'pages/TagFeed/TagFeed'
import YourFeed from 'pages/YourFeed/YourFeed'
import Auth from 'pages/Auth/Auth'
import Settings from 'pages/Settings/Settings'
import UserProfile from 'pages/UserProfile/UserProfile'
import CreateArticle from 'pages/CreateArticle/CreateArticle'
import EditArticle from 'pages/EditArticle/EditArticle'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={GlobalFeed} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/settings" component={Settings} />
      <Route path="/profiles/:slug" exact component={UserProfile} />
      <Route path="/profiles/:slug/favorites" component={UserProfile} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  )
}

export default Routes