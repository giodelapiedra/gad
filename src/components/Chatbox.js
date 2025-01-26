import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GirlIcon from '../images/girl.svg'; // Import your SVG file

const Chatbox = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! How can we assist you today?', from: 'bot', type: 'text' },
        { id: 2, text: 'Do you want to find the database of GAD?', from: 'bot', type: 'options', options: ['Yes, show me the database', 'No, thank you'] },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);

    const handleOptionSelect = (option) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: `You selected: ${option}`, from: 'user', type: 'text' },
        ]);

        setIsLoading(true);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: prevMessages.length + 1,
                    text:
                        option === 'Yes, show me the database'
                            ? <Link to="/Database" className="text-blue-700 underline">Click here to view the GAD Database</Link>
                            : 'Thank you! Let me know if you need anything else.',
                    from: 'bot',
                    type: 'text',
                },
            ]);
            setIsLoading(false);
        }, 1000); // Simulate loading delay
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div>
            {/* Minimized Chatbox */}
            {isMinimized ? (
                <div
                    className="fixed bottom-6 right-6 w-24 h-24 bg-transparent cursor-pointer flex items-center justify-center hover:animate-pulse"
                    onClick={toggleMinimize}
                    title="Click to open Help Chatbot" // Tooltip on hover
                    style={{ zIndex: 9999 }} // Ensure it has a higher z-index to be on top
                >
        <div className="flex flex-col items-center">
    <img 
        src={GirlIcon} 
        alt="Help Chatbot Icon" 
        className="glow-effect" 
        style={{ maxWidth: '700%', height: 'auto' }} // Ensure it scales naturally
    />

</div>

                </div>
            ) : (
                // Maximized Chatbox
                <div
                    className="fixed bottom-6 right-6 w-80 h-[400px] bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col"
                    style={{ zIndex: 9999 }} // Ensure it has a higher z-index to be on top
                >
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={toggleMinimize}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Minimize
                        </button>
                    </div>

                    <div className="text-center mb-4">
                        <p className="text-lg">Need help?</p>
                        <div className="text-xl animate-pulse">🤖 is typing...</div> {/* Typing animation */}
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-2 ${message.from === 'user' ? 'text-right' : 'text-left'}`}
                            >
                                <div
                                    className={`inline-block p-2 rounded-lg ${message.from === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    {message.text}
                                </div>
                                {message.type === 'options' && (
                                    <div className="mt-2 space-x-2">
                                        {message.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleOptionSelect(option)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && <div className="text-gray-500 text-center">Loading...</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbox;
