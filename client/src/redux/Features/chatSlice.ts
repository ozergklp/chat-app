// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    messages: string[];
    msg: string;
    room: string;
    name: string;
    isJoined: boolean;
}

const initialState: ChatState = {
    messages: [],
    msg: '',
    room: '',
    name: '',
    isJoined: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
    setMessages: (state, action: PayloadAction<string[]>) => {
        state.messages = action.payload;
    },
    setMsg: (state, action: PayloadAction<string>) => {
        state.msg = action.payload;
    },
    setRoom: (state, action: PayloadAction<string>) => {
        state.room = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
    },
    setIsJoined: (state, action: PayloadAction<boolean>) => {
        state.isJoined = action.payload;
    },
    },
});

export const { setMessages, setMsg, setRoom, setName, setIsJoined } = chatSlice.actions;
export default chatSlice.reducer;
