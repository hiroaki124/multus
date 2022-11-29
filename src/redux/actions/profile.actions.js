export const VISIBLE_MODAL = 'VISIBLE_MODAL';


export function setModalVisible(value)
{
    return (dispatch) => {
        dispatch({
            type   : VISIBLE_MODAL,
            payload: value
        })
    }
}
