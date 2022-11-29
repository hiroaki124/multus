export const SET_UID = 'SET_UID';
export const DECREMENT = 'DECREMENT';

export function setUID(uid)
{
    return (dispatch) => {
        dispatch({
            type   : SET_UID,
            payload: uid
        })
    }
}
export function decrease(number)
{
    return (dispatch) => {
        dispatch({
            type   : DECREMENT,
            payload: number
        })
    }
}