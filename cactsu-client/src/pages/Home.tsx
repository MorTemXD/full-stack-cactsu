import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
    nickname: string;
    message: string;
}

const Chat: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const socket: Socket = io();

    useEffect(() => {
        socket.on('add mess', function(data: Message) {
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
        <div className="container mx-auto mt-10 p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-blue-500 p-4">
                    <h4 className="text-white text-lg">Chat</h4>
                </div>
                <div className="p-4 h-80 overflow-y-auto">
                    <div id="all_messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <strong className="text-blue-500">{msg.nickname}:</strong> {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="p-2 border rounded-md"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
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
