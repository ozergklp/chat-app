import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { findWho } from '../App';
import { setMessages } from '../redux/Features/chatSlice';
import { socket } from './socket';

export default function MessageList() {
    //const socket = useSelector((state: RootState) => state.socket.socket)
    const dispatch = useDispatch();

    const messages = useSelector((state:RootState) => state.chatState.messages)
    
    
    const msg = useSelector((state: RootState) => state.chatState.msg)
    React.useEffect(() => {
        if (socket) {
            socket.on('receive-msg', (message: string) => {
                dispatch(setMessages([...messages, `${name}: ${msg}`]));
            });
    
            return () => {
                socket.off('receive-msg');
            };
        }
    }, [dispatch, socket]);
    
    
    const name = useSelector((state: RootState) => state.chatState.name)
        
    return (
        <ul className='flex flex-col   w-11/12 bg-slate-200 m-5 p-4 rounded-xl h-[500px]  overflow-y-scroll'>
        {messages.map((item: string, index) => {
            const { name: sender, msg } = findWho(item);
            const isCurrentUser = sender === name;
            if(isCurrentUser){
                return (
                    <li key={index} className='ml-auto m-1  p-1 flex bg-white rounded-xl  flex-col items-end'>
                        <p className=' p-1 rounded-2xl text-blue-500  inline'>{sender}</p>
                        <p className='p-1 py-0 rounded-2xl text-lg inline'>{msg}</p>
                    </li>
                )
            }
            else {
                return (
                    <li className='mr-auto m-1 p-1 flex flex-col rounded-xl bg-white items-start'>
                        <p className=' p-1 rounded-2xl text-green-500 inline'>{sender}</p>
                        <p className=' p-1 py-0 rounded-2xl text-lg  inline'>{msg}</p>
                    </li>
                )
            }
        })}
    </ul>
    )
}
