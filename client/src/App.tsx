import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { RootState } from './redux/store';
import { socket } from './components/socket';
import RoomEnterForm from './components/RoomEnterForm';
import { Root } from 'react-dom/client';
import { setMessages } from './redux/Features/chatSlice';
import SendMessage from './components/SendMessage';
import MessageList from './components/MessageList';

const App: React.FC = () => {
    const room = useSelector((state: RootState) => state.chatState.room)
    const isJoined = useSelector((state: RootState) => state.chatState.isJoined)

    return (
        <main className='min-h-screen bg-slate-300 font-grotesk flex justify-center items-center flex-col'>
        {isJoined && (<h2 className='text-left text-2xl text-slate-800 w-full m-5 my-0  p-4 pl-10'>Room {`${room}`}</h2>)}
        <MessageList />
        <SendMessage />
        <RoomEnterForm />
            
        </main>
    );
};

export default App;

export const findWho = (message: string) => {
    const indexOfColon: number = message.indexOf(":");
    const name: string = message.slice(0, indexOfColon).trim();
    const msg: string = message.slice(indexOfColon + 1).trim();

    
    return { name, msg };
};