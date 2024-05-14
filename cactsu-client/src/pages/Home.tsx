import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
    nickname: string;
    message: string;
}

const Chat: React.FC = () => {
    const [nickname, setNickname] = useState<string>('Guest');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const socket: Socket = io();

    useEffect(() => {
        const fetchNickname = async () => {
            try {
                const response = await fetch('/api/nickname'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNickname(data.nickname);
            } catch (err) {
                console.error('Failed to fetch nickname:', err);
            }
        };

        fetchNickname();

        socket.on('add mess', (data: Message) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nickname && message) {
            socket.emit('send mess', { nickname, message });
            setMessage('');
        }
    };

    return (
        <div className="mt-40 flex flex-col justify-center items-center text-black">
            <div className="main bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-center text-xl mb-10 text-blue-500">Chat</h1>
                <div className="p-4 h-80 overflow-y-auto border border-gray-200 rounded-lg">
                    <div id="all_messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <strong className="text-blue-500">{msg.nickname}:</strong> {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
                    <div className="relative">
                        <input
                            type="text"
                            className="input pl-10 pr-2 w-full border rounded-md p-2"
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-purple mx-auto bg-blue-500 text-white p-2 rounded-md">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    return <div>Home</div>;
};

const App: React.FC = () => {
    return (
        <div>
            <Home />
            <Chat />
        </div>
    );
};

export default App;
