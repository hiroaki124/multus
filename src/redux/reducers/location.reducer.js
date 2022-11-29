const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'SET_LOCATION':  
        state=action.payload
        return state;
    case 'DECREMENT':
      return action.payload;
    default:
      return state;
  }
}