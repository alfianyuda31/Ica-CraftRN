import {showMessage} from '../../utils';

const {default: axios} = require('axios');
const {API_HOST} = require('../../config');

export const getCraftData = () => dispatch => {
  axios
    .get(`${API_HOST.url}/craft`)
    .then(res => {
      dispatch({type: 'SET_CRAFT', value: res.data.data.data});
    })
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Craft API` ||
          'Terjadi kesalahan di API Craft',
      );
    });
};

export const getCraftDataByTypes = types => dispatch => {
  axios
    .get(`${API_HOST.url}/craft?types=${types}`)
    .then(res => {
      if (types === 'new_craft') {
        dispatch({type: 'SET_NEW_CRAFT', value: res.data.data.data});
      }
      if (types === 'popular') {
        dispatch({type: 'SET_POPULAR', value: res.data.data.data});
      }
      if (types === 'recommended') {
        dispatch({type: 'SET_RECOMMENDED', value: res.data.data.data});
      }
    })
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Craft By Type API` ||
          'Terjadi kesalahan di API Craft By Type',
      );
    });
};
