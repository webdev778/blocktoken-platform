import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import NotFoundPage from 'pages/DefaultPages/NotFoundPage'
import HomePage from 'pages/DefaultPages/HomePage'
import { connect } from 'react-redux'

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
    needsVerification: false,
  },
  '/signup': {
    component: loadable(() => import('pages/DefaultPages/SignupPage')),
    needsVerification: false,
  },
  '/confirm': {
    component: loadable(() => import('pages/DefaultPages/ConfirmPage')),
  },
  '/admin/users': {
    component: loadable(() => import('pages/Dashboard/UsersListPage')),
  },
  '/admin/identity': {
    component: loadable(() => import('pages/Dashboard/IdentityListPage')),
  },
  '/token/list': {
    component: loadable(() => import('pages/Dashboard/TokenListPage')),
  },
  '/token/crowdsale': {
    component: loadable(() => import('pages/Dashboard/CrowdsaleListPage')),
  },
  '/token-wizard/token': {
    component: loadable(() => import('pages/Dashboard/TokenPage')),
  },
  '/token-wizard/crowdsale': {
    component: loadable(() => import('pages/Dashboard/CrowdsalePage')),
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

  '/account': {
    component: loadable(() => import('pages/Dashboard/AccountPage')),
  },
  '/identity': {
    component: loadable(() => import('pages/Dashboard/IdentityPage')),
  },
  '/buytoken': {
    component: loadable(() => import('pages/Dashboard/BuyTokenPage')),
  },
  '/confirmation/:token/': {
    component: loadable(() => import('pages/DefaultPages/VerifyPage')),
  },
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
    const isUserVerified = false

    return (
      <ConnectedSwitch>
        <Route exact path="/" component={HomePage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, needsVerification, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          props.needsVerification = needsVerification === void 0 || needsVerification || false  //set true as default
          if (!isUserVerified && needsVerification) {
            props.component = loadable(() => import('pages/DefaultPages/EmptyPage')) // TODO: replace with your verify page component
          }
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
