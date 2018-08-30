import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import NotFoundPage from 'pages/DefaultPages/NotFoundPage'
import HomePage from 'pages/DefaultPages/HomePage'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  // Default Pages
  '/login': {
    component: loadable(() => import('pages/DefaultPages/LoginPage')),
  },
  '/signup': {
    component: loadable(() => import('pages/DefaultPages/SignupPage')),
  },
  '/profile': {
    component: loadable(() => import('pages/Dashboard/ProfilePage')),
  },
  '/admin/users': {
    component: loadable(() => import('pages/Dashboard/UsersListPage')),
  },
  '/token/list': {
    component: loadable(() => import('pages/Dashboard/TokenListPage')),
  },
  '/token/create': {
    component: loadable(() => import('pages/Dashboard/CreateTokenPage')),
  },
  '/token/crowdsale': {
    component: loadable(() => import('pages/Dashboard/CrowdsaleListPage')),
  },
  '/crowdsale/create': {
    component: loadable(() => import('pages/Dashboard/CreateCrowdsalePage')),
  },
  '/empty': {
    component: loadable(() => import('pages/DefaultPages/EmptyPage')),
  },
  '/projects/active': {
    component: loadable(() => import('pages/Dashboard/ViewProjectsPage')),
  },

  // Dashboards
  '/user/dashboard': {
    component: loadable(() => import('pages/Dashboard/DashboardUserPage')),
  },

  '/admin/dashboard': {
    component: loadable(() => import('pages/Dashboard/DashboardUserPage')),
  },
<<<<<<< HEAD

  '/account': {
    component: loadable(() => import('pages/Dashboard/AccountPage')),
  },
  '/identity' : {
    component: loadable(() => import('pages/Dashboard/IdentityPage')),
  },
  '/wallet' : {
    component: loadable(() => import('pages/Dashboard/MyWalletPage')),
  },
=======
>>>>>>> b8ce3e02f1d5c50f64222cb47dc1e01f616e18ef
}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path="/" component={HomePage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
