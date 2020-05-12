import {CHANNEL_CONNECTED,GET_USERS, NEW_CHAT} from "../chat/chatActions";

const initialState = {
    selectedChat: null,
    newChatFormVisible: false,
    email: null,
    friends: [],
    chats: [],
    username: '',
    channelConnected: false,
    chatMessage: '',
    roomNotification: [],
    broadcastMessage: [],
    error: '',
    bottom: false,
    curTime: '',
    openNotifications: false,
    bellRing: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case CHANNEL_CONNECTED:

            return {
                ...state,

            };
        case GET_USERS:
            return{
                ...state,
                chats: payload
            };
        case NEW_CHAT:
            return{
                ...state,
                newChatFormVisible: true,
                selectedChat: null
            }
        default:
            return state;
    }
}
