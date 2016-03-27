import * as API from './api';

let pollInterval;

export function discoverServices () {
  return (dispatch) => {
    dispatch({
      type: 'CREATE_DISCOVERY'
    });

    API.createDiscovery((err, res) => {
      res = JSON.parse(res.text);
      if (err) {
        dispatch({
          type: 'CREATE_DISCOVERY_FAIL',
          data: err
        });
      } else {
        console.log(res);
        dispatch({
          type: 'CREATE_DISCOVERY_SUCCESS'
        });
      }

      let pollTimes = 0;

      clearInterval(pollInterval);
      pollInterval = setInterval(() => {
        API.pollDiscovery(res._links.discovery.href, (err, res) => {
          dispatch({
            type: 'POLL_DISCOVERY_SUCCESS',
            data: res.services,
            progress: Math.floor((pollTimes / 9) * 100)
          });
          pollTimes++;
        });

        if (pollTimes > 8) {
          dispatch({
            type: 'POLL_DISCOVERY_END'
          });
          clearInterval(pollInterval);
        }

      }, 800);
    });

    return () => clearInterval(pollInterval);
  };
}
