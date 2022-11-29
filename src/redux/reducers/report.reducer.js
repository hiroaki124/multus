const INITIAL_STATE = {
    photourl:'',
    qrcode:'',
};

export default (state = INITIAL_STATE, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'SET_PHOTO_URL':  
        state.photourl=action.payload
        return state;
    case 'SET_QRCODE':  
        state.qrcode=action.payload
        return state;
    default:
      return state;
  }
}