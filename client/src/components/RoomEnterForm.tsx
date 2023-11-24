
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom, setName, setIsJoined } from '../redux/Features/chatSlice';
import { RootState } from '../redux/store';
import { socket } from './socket';

export default function RoomEnterForm() {
    const dispatch = useDispatch();
    const room = useSelector((state: RootState) => state.chatState.room);
    const name = useSelector((state: RootState) => state.chatState.name);
    const isJoined = useSelector((state: RootState) => state.chatState.isJoined);

    const handleJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setIsJoined(true));
        if (socket) {
            socket.emit('join-room', room,);
        }
    };

    return (
        <React.Fragment>
        {!isJoined && (
            <form className='flex flex-col mx-auto p-4 rounded-xl  bg-slate-100  '>
                <label htmlFor='name' data-testid='name' className=' my-2 text-lg text-slate-800'>Your Name:</label>
                <input
                name='name'
                id='name'
                type='text'
                value={name}
                onChange={(e) => {
                    console.log(e.target.value)
                    dispatch(setName(e.target.value))
                }}
                placeholder='Type your name...'
                className='border-2  p-1 pl-3 rounded-xl bg-slate-200 outline-slate-300 mb-3'
                />

                <label htmlFor='room' className=' my-2 text-lg text-slate-800'>Room:</label>
                <input
                id='room'
                name='room'
                type='text'
                value={room}
                onChange={(e) => dispatch(setRoom(e.target.value))}
                placeholder='Enter room...'
                className='border-2  p-1 pl-3 rounded-xl bg-slate-200 outline-slate-300'
                />
                <button
                type='submit'
                className='p-1 text-lg bg-blue-500 text-white my-5 mb-1 ml-auto border-2 w-1/2  float-right rounded-xl'
                onClick={handleJoin}
                >
                Join
                </button>
            </form>
            )}
        </React.Fragment>
    );
}