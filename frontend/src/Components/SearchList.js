import React from "react";
import { makeApiCall } from "../api/api";

export const SearchList = ({ searchUserList, loggedInUser }) => {
    const handleAddFriend = async (user) => {
        const options = {
            method: "POST",
            body: {
                userId: user._id,
                from: loggedInUser._id
            },
            path: "addFriend"
        }
        const res = await makeApiCall(options);
        console.log(res);
    }
    return (
        <div className='mt-2'>
            {
                searchUserList.map((user) => {
                    return (
                        <div className='flex p-2 flex-start border-2 rounded  border-red-300'>
                            <div className='flex justify-between w-full'>
                                <div>
                                    <h3>{user.name}</h3>
                                </div>
                                <div onClick={() => handleAddFriend(user)}>
                                    {new Map(Object.entries(user.friendRequests)).get(loggedInUser?._id) ? <div>Pending</div> : <div>Add</div>}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}