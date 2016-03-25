import * as API from './api';

export function getPorts () {
  return (dispatch) => {
    dispatch({
      type: 'LIST_PORTS'
    });

    API.getPorts(function (err, res) {
      if (err) {
        dispatch({
          type: 'LIST_PORTS_FAIL',
          data: err
        });
      } else {
        dispatch({
          type: 'LIST_PORTS_SUCCESS',
          data: res._embedded.ports
        });
      }
    });
  }
}
