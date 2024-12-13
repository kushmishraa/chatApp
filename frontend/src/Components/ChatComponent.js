import React, { useEffect, useRef, useState } from "react";

export const ChatComponent = ({ selectedUser, loggedInUser }) => {
    const [socket, setSocket] = useState();
    const [message, setMessage] = useState("");
    const lastDivRef = useRef();
    const textAreaRef = useRef();

    const handleInput = (e) => {
        const textArea = textAreaRef.current;
        setMessage(e.target.value);
        if (textArea) {
            textArea.style.height = "auto"; // Reset height to recalculate
            textArea.style.height = `${textArea.scrollHeight}px`; // Set height to content
        }
    };

    const sendMsg = () => {
        if (socket && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ 
                message: {
                    type:"sendMessage",
                    selectedUser: selectedUser._id,
                    username: selectedUser.userName,
                    loggedInUser: loggedInUser._id,
                    timeStamp : Date.now(),
                    message: message
                }
             }));
        }
    }

    useEffect(() => {
        const intiWs = async () => {
            await fetch('http://localhost:3001/initWs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ serverStatus: true })
            });
        }
        intiWs();
        const ws = new WebSocket("ws://localhost:3001");
        ws.onopen = () => {
            console.log('WebSocket connected');
            setSocket(ws);
        };
    }, [])

    useEffect(() => {
        if (lastDivRef.current) {
            lastDivRef.current.scrollIntoView({ block: "start" })
        }
    }, [lastDivRef.current, selectedUser])

    return (
        <>
            {
                selectedUser != null ?
                    <div className='relative flex flex-col h-full max-h-screen overflow-scroll'>
                        <div className='p-2 border border-black sticky top-0 bg-white'>
                            <div className='flex flex-start'>
                                <h3>{selectedUser.name}</h3>
                            </div>
                        </div>
                        <div className='flex-grow flex flex-col'>
                            <h3 className='mt-auto' ref={lastDivRef}>Messages</h3>
                        </div>
                        <div className='flex gap-5 items-end border-2 p-5 sticky bottom-0 bg-white'>
                            <div></div>
                            <div className='flex-grow border border-black  rounded'>
                                <textarea
                                    placeholder='Enter your message'
                                    style={{
                                        width: "100%",
                                        minHeight: "50px",
                                        resize: "none",
                                        overflow: "hidden",
                                    }}
                                    className='focus:outline-none'
                                    ref={textAreaRef}
                                    onInput={handleInput}
                                    value={message}
                                />
                            </div>
                            <div className='border border-black p-2 rounded-lg' onClick={(e) => {
                                sendMsg(e.target.value);
                            }}>
                                <button>Send</button>
                            </div>
                        </div>
                    </div>
                    :
                    <> please select a chat </>
            }
        </>
    )
}