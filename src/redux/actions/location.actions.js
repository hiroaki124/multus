export const SET_LOCATION = 'SET_LOCATION';

export function setLocation(location)
{
    return (dispatch) => {
        dispatch({
            type   : SET_LOCATION,
            payload: location
        })
    }
}