import { GET_ENTRYS, GET_TEAM_ENTRYS, SELECT_ENTRY, TOGGLE_ENTRY_DIALOG } from "../types";
import { setAlert } from './alert';


export const toggleEntryDialog = () => ({type: TOGGLE_ENTRY_DIALOG})

export const selectEntry = each_entry => ({
  type: SELECT_ENTRY,
  payload: each_entry
})


// Get all entries
export const getEntrys = () => async dispatch => {  
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/entry/all';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const entry = await response.json();
    if (response.ok) {
      dispatch({ type: GET_ENTRYS, payload: entry });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

// get entries for specific teams
export const getTeamEntrys = (teamId) => async dispatch => {  
  try {
    const token = localStorage.getItem('jwtToken');
    const url = 'team/entry/' + teamId;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const entry = await response.json();
    if (response.ok) {
      dispatch({ type: GET_TEAM_ENTRYS, payload: entry });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

// Create entries
export const addEntry = newEntry => async dispatch => {
  try {
      const token = localStorage.getItem('jwtToken');
      const url = '/entry';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      })
      await response.json();
      if (response.ok) {
        dispatch(setAlert('Entry Created', 'success', 5000));
        dispatch(getEntrys())
        //dispatch(postAlert({title: 'entryAdded', message: [`Created by ${user && user.name}`, 'success'] }))
        return { status: 'success', message: 'Entry created' };
      }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    //dispatch(postAlert({title: 'entryAdded', message: ['error', 'error'] }))
  }
};

// update entries
export const updateEntry = (entry, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/entry/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    });
    if (response.ok) {
      dispatch(setAlert('Data Updated', 'success', 5000));
      //dispatch(postAlert({title: 'entryUpdated', message: [`Updated by ${user && user.name}`, 'success'] }))
      return { status: 'success', message: 'Data Updated' };
    } 
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Data has not been saved, try again.'
    };
  }
};


// Delete Task
export const deleteEntry = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/entry/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(setAlert('Entry Deleted', 'success', 5000));
      dispatch(getEntrys());
      return { status: 'success', message: 'Entry Removed' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Entry has not been deleted, try later.'
    };
  }
};


