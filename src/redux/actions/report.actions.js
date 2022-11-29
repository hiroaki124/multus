export const SET_PHOTO_URL = 'SET_PHOTO_URL';
export const SET_QRCODE = 'SET_QRCODE';
export function setPhotoUrl(value)
{
    return (dispatch) => {
        dispatch({
            type   : SET_PHOTO_URL,
            payload: value
        })
    }
}
export function setQRCode(value)
{
    return (dispatch) => {
        dispatch({
            type   : SET_QRCODE,
            payload: value
        })
    }
}