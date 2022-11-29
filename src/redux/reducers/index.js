import { combineReducers } from 'redux';
import SignUpReducer from './signup.reducer';
import Location from './location.reducer';
import Profile from './profile.reducer';
import Report from './report.reducer';

export default combineReducers({
    signup: SignUpReducer,
    location: Location,
    profile: Profile,
    report: Report,
});