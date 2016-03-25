const initialState = {
  loading: false,
  data: []
};

export default function ports (state = initialState, action) {
  switch(action.type) {
    case 'LIST_PORTS_SUCCESS':
      return {
        ...state,
        data: action.data
      };
    case 'LIST_PORTS':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
