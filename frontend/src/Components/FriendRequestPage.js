import React from "react";
import { useDispatch } from "react-redux";
import { handleFriendRequest } from "../Slices/userSlice";

export const FriendRequestPage = ({ friendRequests, loggedInUser }) => {
    const dispatch = useDispatch()
    return (
        <div className='flex flex-col h-full flex-start items-start mt-2'>
            {
                Array.from(friendRequests, ([key, value]) => {
                    return (
                        <div className='flex justify-between items-center border-black w-full border p-2 rounded'>
                            <div>
                                {value.from.name}
                            </div>
                            <div className='*:ml-2'>
                                <button className='border-2 rounded p-1'
                                    onClick={() => dispatch(handleFriendRequest({
                                        isAccepted: true,
                                        from: loggedInUser,
                                        to: value.from
                                    }))}>Accept</button>
                                <button className='border-2 rounded p-1' onClick={() => {
                                    dispatch(handleFriendRequest({
                                        isAccepted: false,
                                        from: loggedInUser?._id,
                                        to: value?._id
                                    }))
                                }}>Reject</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}