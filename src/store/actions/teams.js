import { GET_TEAMS, SELECT_TEAM, GET_ALL_TEAMS } from "../types";
import { setAlert } from './alert';


// Get all teams for specific user
export const getTeams = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
        const url = '/myteams/';
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const teams = await response.json();
        if (response.ok) {
          dispatch({ type: GET_TEAMS, payload: teams });
        }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
 };

// Get specific team by id
export const getTeam = id => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
        const url = '/teams/' + id;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();
        if (response.ok) {
          dispatch({ type: SELECT_TEAM, payload: responseData });
        }
      } catch (error) {
        dispatch(setAlert(error.message, 'error', 5000));
      }
  };
  

// Get all teams 
export const getAllTeams = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
        const url = '/teams/all';
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const teams = await response.json();
        if (response.ok) {
          dispatch({ type: GET_ALL_TEAMS, payload: teams });
        }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
 };


// Create Team
export const createTeam = newTeam => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/teams/create';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTeam)
    });
    await response.json();
    if (response.ok) {
      dispatch(setAlert('Team Created', 'success', 5000));
      dispatch(getAllTeams());
      return { status: 'success', message: 'Team Created' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Team has not been saved, try again.'
    };
  }
};

// Update Team
export const updateTeam = (team, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/teams/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(team)
    });
    if (response.ok) {
      dispatch(setAlert('Team Updated', 'success', 5000));
      return { status: 'success', message: 'Team Updated' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Team has not been updated, try again.'
    };
  }
    };

// Delete Team
export const deleteTeam = teamId => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/teams/' + teamId;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        dispatch(getAllTeams());
        dispatch(setAlert('Team has been Deleted!', 'success', 5000));
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
    }
  };


