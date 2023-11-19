import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, setMsg } from '../redux/Features/chatSlice';
import { RootState } from '../redux/store';
import { socket } from './socket';

export default function SendMessage() {
    const dispatch = useDispatch();
    const room = useSelector((state: RootState) => state.chatState.room);
    const msg = useSelector((state: RootState) => state.chatState.msg)
    //const socket = useSelector((state: RootState) => state.socket.socket);
    const messages = useSelector((state: RootState) => state.chatState.messages)
    const name = useSelector((state: RootState) => state.chatState.name)

    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
         // Clear the message input
        e.preventDefault();
        if (socket) {
            socket.emit('send-msg', msg, room, name);
            dispatch(setMessages([...messages, `${name}: ${msg}`])); // Update here
        }
        dispatch(setMsg(''));
    };

    return (
        <section className='flex w-11/12 bg-slate-200 p-1 rounded-xl text-lg'>
        <input
        id='msg'
        name='msg'
        type='text'
        value={msg}
        onChange={(e) => dispatch(setMsg(e.target.value))}
        placeholder='Type your message...'
        className='border-2 p-1 pl-3 m-2 mr-1  flex-1 rounded-xl outline-blue-500'
        />
        <button
        type='submit'
        className=' border-2 p-1 m-2 rounded-xl px-2  bg-blue-500 text-white'
        onClick={handleSend}
        >
        Send
        </button>
        </section>
    )
}
