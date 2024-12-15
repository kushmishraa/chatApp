import React, { useEffect, useRef, useState } from "react";
import { convertObjToMap, getHoursMin } from "../Utils/utils";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Slices/userSlice";
import { useSelector } from "react-redux";

export const ChatComponent = ({ selectedUser, loggedInUser, friendList }) => {
    const [socket, setSocket] = useState();
    const [message, setMessage] = useState("");
    const lastDivRef = useRef();
    const textAreaRef = useRef();

    const msgList = convertObjToMap(friendList.get(selectedUser._id).message);

    const dispatch = useDispatch();

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
                    type: "sendMessage",
                    selectedUser: selectedUser._id,
                    username: selectedUser.userName,
                    loggedInUser: loggedInUser._id,
                    timeStamp: Date.now(),
                    message: message
                }
            }));
            setMessage("")
        }
    }

    useEffect(() => {
        const intiWs = async () => {
            await fetch('http://localhost:3001/initWs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ serverStatus: true, loggedInUser })
            });
        }
        intiWs();
        const ws = new WebSocket("ws://localhost:3001");
        ws.onopen = () => {
            console.log('WebSocket connected');
            setSocket(ws);
        };
        ws.onmessage = (data) => {
            console.log("message recived from socket =>", JSON.parse(data.data));
            const updatedUser = JSON.parse(data.data).updatedUser;
            dispatch(setLoggedInUser(updatedUser));
        }
    }, [])

    useEffect(() => {
        if (lastDivRef.current) {
            lastDivRef.current.scrollIntoView({ block: "start" })
        }
    }, [lastDivRef.current, selectedUser]);

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
                        <div className='flex-grow flex flex-col gap-2 p-2'>
                            {
                                Array.from(msgList, ([key, value], index) => {
                                    return (
                                        <div className={`flex`} style={{ justifyContent: `${key.split("-")[0] == loggedInUser.userName ? 'end' : 'start'}` }}>

                                            <div ref={msgList.size - 1 == index ? lastDivRef : null} className="p-5 border-2 border-black rounded-lg" >
                                                {value}
                                                <div>{getHoursMin(key.split("-")[1])}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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