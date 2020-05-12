import {SET_CURRENT_ACTIVITY_TYPE, SHOW_QR_ATTENDANCE_FAILED} from "../attendance/qrCodeActions";
import axios from "axios";

export const CHANNEL_CONNECTED = "CHANNEL_CONNECTED";
export const MESSAGE_SENT = "MESSAGE_SENT";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const GET_USERS ="GET_USERS";
export const NEW_CHAT = "NEW_CHAT";

export const message_sent = (message_sent) => async dispatch => {

};

export const get_users = () => async dispatch => {
    try{
        const url = "http://localhost:8765/chat/users";
        let res = await axios.get(url);
        console.log(res);
        console.log(res.data);

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);
    }
};

export const new_chat = () => async dispatch => {
    dispatch({
        type: NEW_CHAT
    })
};
