const INITIAL_STATE = {
    modalVisible:false,
    
};

export default (state = INITIAL_STATE, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'VISIBLE_MODAL':  
        state.modalVisible=action.payload
        return state;
    
    default:
      return state;
  }
}