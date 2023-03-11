import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import teams from './teams'
import entry from './entry'

export default combineReducers({
  alertState: alert,
  authState: auth,
  userState: users,
  teamState: teams,
  entryState: entry
});
