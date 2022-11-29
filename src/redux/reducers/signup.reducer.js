const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'SET_UID':         
      return action.payload;
    case 'DECREMENT':
      return action.payload;
    default:
      return state;
  }
}