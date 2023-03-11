import { GET_TEAMS, SELECT_TEAM, UPDATE_TEAM, DELETE_TEAM, GET_ALL_TEAMS} from '../types'

const initialState = {
    teams: [],
    team: [],
    allTeams: []
}

const getAllTeams =(state, payload) => ({
  ...state,
  allTeams: payload
})
const getTeams = (state, payload) => ({
    ...state,
    teams: payload
})

const getTeam = (state, payload) => ({
    ...state,
    team: payload
  });
  
  export default (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_TEAMS:
        return getAllTeams(state, payload)
        
      case GET_TEAMS:
        return getTeams(state, payload);

      case SELECT_TEAM:
        return getTeam(state, payload);

        case UPDATE_TEAM:
          let index = state.teams.findIndex(
            team => team._id === action.payload._id
          );
    
          state.teams.splice(index, 1);
    
          return {
            ...state,
            teams: [action.payload, ...state.teams]
          };
        case DELETE_TEAM:
          return {
            ...state,
            teams: state.teams.filter(
              team => team._id !== action.payload
            )
          };
      default:
        return state;
    }
  };