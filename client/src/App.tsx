import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { RootState } from './redux/store';
import { socket } from './components/socket';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState<string[]>([]);
    const [msg, setMsg] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isJoined, setIsJoined] = useState<boolean>(false);

    useEffect(() => {

        if (socket) {
        socket.on('receive-msg', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receive-msg');
        };
        }
    }, [dispatch]);

    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        setMsg('')
        e.preventDefault();
        if (socket) {
        socket.emit('send-msg', msg, room, name);
        setMessages((prevMessages) => [
            ...prevMessages,
            `${name}: ${msg}`,
        ]);
        }
    };

    const handleJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsJoined(true);
        if (socket) {
        socket.emit('join-room', room,);
        }
    };

    return (
        <main className='min-h-screen bg-slate-300 font-grotesk flex justify-center items-center flex-col'>
        {isJoined && (<h2 className='text-left text-2xl text-slate-800 w-full m-5 my-0  p-4 pl-10'>Room {`${room}`}</h2>)}
        {messages.length >= 1 && (
            <React.Fragment>
            <ul className='flex flex-col   w-11/12 bg-slate-200 m-5 p-4 rounded-xl h-[500px]  overflow-y-scroll'>
                {messages.map((item: string, index) => {
                    const { name: sender, msg } = findWho(item);
                    const isCurrentUser = sender === name;
                    if(isCurrentUser){
                        return (
                            <li className='ml-auto m-1  p-1 flex bg-white rounded-xl  flex-col items-end'>
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
            </React.Fragment>
            
        )}
            {isJoined && (
            <section className='flex w-11/12 bg-slate-200 p-1 rounded-xl text-lg'>
                <input
                id='msg'
                name='msg'
                type='text'
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
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
            )}

            {!isJoined && (
            <form className='flex flex-col mx-auto p-4 rounded-xl  bg-slate-100  '>
                <label htmlFor='name' className=' my-2 text-lg text-slate-800'>Your Name:</label>
                <input
                name='name'
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Type your message...'
                className='border-2  p-1 pl-3 rounded-xl bg-slate-200 outline-slate-300 mb-3'
                />

                <label htmlFor='room' className=' my-2 text-lg text-slate-800'>Room:</label>
                <input
                id='room'
                name='room'
                type='text'
                value={room}
                onChange={(e) => setRoom(e.target.value)}
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
        </main>
    );
};

export default App;

export const findWho = (message: string) => {
    const indexOfColon: number = message.indexOf(":");
    const name: string = message.slice(0, indexOfColon).trim();
    const msg: string = message.slice(indexOfColon + 1).trim();

    console.log({ name, msg });
    return { name, msg };
};