import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';
import { getEntrys, getTeams, getAllTeams } from './store/actions';
import { connect } from 'react-redux';

// Admin
const DashboardPage = lazy(() => import('./pages/Admin/Dashboard'));
const User = lazy(() => import('./pages/Admin/User'));
const Account = lazy(() => import('./pages/Admin/Account'));
const EntryList = lazy(() => import('./pages/Admin/EntryList'))
const Geospatial = lazy(() => import('./pages/Admin/Geospatial'))
const Notification = lazy(() => import('./pages/Admin/Notification'))
const TeamList = lazy(() => import('./pages/Admin/TeamList'))

// Register - Login
const Register = lazy(() => import('./pages/Public/Register'));
const Login = lazy(() => import('./pages/Public/Login'));
const ErrorPage = lazy(() => import('./pages/Error'))

// Public
//const HomePage = lazy(() => import('./pages/Public/HomePage'));
const Entry = lazy(() => import('./pages/Public/Entry'));
const Team = lazy(() => import('./pages/Public/Team'));
// );
const EntryPage = lazy(() => import('./pages/Admin/EntryPage'))
//const GeoPublic =  lazy(() => import('./pages/Public/GeoPublic'));
const Contact = lazy(() => import('./pages/Public/Contact'));

function Routes(props) {
  const { teams, team, allTeams } = props
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <WithLayoutRoute
            exact
            path="/teamdash/:userId"
            layout={PublicLayout}
            component={Team}
            teams={teams}
            allTeams={allTeams}
            layoutProps={{ withFooter: false }}
          />

          <WithLayoutRoute
            exact
            path="/teamdash/entry/:teamId"
            component={Entry}
            team={team}
            layout={PublicLayout}
          />

          <WithLayoutRoute
                exact
                path="/"
                layout={PublicLayout}
                component={Contact}
              />
          <ProtectedRoute
            exact
            path="/admin/dashboard"
            layout={AdminLayout}
            component={DashboardPage}
          />
          <ProtectedRoute
            exact
            path="/admin/entry"
            layout={AdminLayout}
            component={EntryList}
          />
          <ProtectedRoute
            exact
            path="/entry/:selectedEntryId"
            layout={AdminLayout}
            component={EntryPage}
          />
          <ProtectedRoute
            exact
            path="/admin/teams"
            layout={AdminLayout}
            component={TeamList}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            layout={AdminLayout}
            component={User}
          />
          <ProtectedRoute
            exact
            path="/admin/geospatial"
            layout={AdminLayout}
            component={Geospatial}
            layoutProps={{ withFooter: false }}
          />
          <ProtectedRoute
            exact
            path="/admin/notifications"
            layout={AdminLayout}
            component={Notification}
            layoutProps={{ withFooter: false }}
          />
          <ProtectedRoute
            exact
            path="/admin/account"
            layout={AdminLayout}
            component={Account}
          />
          <WithLayoutRoute path="*" layout={PublicLayout} component={ErrorPage} />
        </Switch>
      </Router>
    </Suspense>
  );
};

const mapStateToProps = ({teamState, entryState}) => ({
  teams: teamState.teams,
  team: teamState.team,
  allTeams: teamState.allTeams,
  entry: entryState.entry,
  selectedEntry: entryState.selectedEntry
})

export default 
  connect(
    mapStateToProps,
    { getTeams, getEntrys, getAllTeams}
  )(Routes)

