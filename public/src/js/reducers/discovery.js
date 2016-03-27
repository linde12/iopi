const initialState = {
  loading: false,
  data: []
};

export default function discovery (state = initialState, action) {
  switch(action.type) {
    case 'CREATE_DISCOVERY':
      return {
        data: [],
        loading: true,
        progress: 0
      };
    case 'CREATE_DISCOVERY_SUCCESS':
      return {
        ...state
      };
    case 'POLL_DISCOVERY_SUCCESS':
      return {
        ...state,
        data: action.data,
        progress: action.progress
      }
    case 'POLL_DISCOVERY_END':
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
