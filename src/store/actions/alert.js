import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, GET_ALERTS } from '../types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const postAlert = (alert) => async dispatch => {
  try {
    const url = '/alert';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert)
    });
    await response.json();
    if (response.ok) {
      //dispatch(setAlert('Entr Created', 'success', 5000));
      dispatch(getAlerts)
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};


export const getAlerts = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/alert';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const alert = await response.json();
    if (response.ok) {
      dispatch({ type: GET_ALERTS, payload: alert });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
}
