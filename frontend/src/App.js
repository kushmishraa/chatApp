import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleFriendRequest, setCachedLists } from './Slices/userSlice';
import { makeApiCall } from './api/api';
import { useNavigate } from 'react-router-dom';
import { FriendRequestPage } from './Components/FriendRequestPage';
import { SearchList } from './Components/SearchList';
import { ChatComponent } from './Components/ChatComponent';
import { convertObjToMap } from './Utils/utils';

function App() {
  const [searchUser, setSearchUser] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const [showFriendRequestPage, setShowFriendRequestPage] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const cachedLists = useSelector(state => state.user.cachedLists);
  const friendRequests = loggedInUser?._id && new Map(Object.entries(loggedInUser.friendRequests));
  const friendList = loggedInUser && convertObjToMap(loggedInUser?.friendList);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser == null) {
      navigate('/login');
    }
  }, [loggedInUser])



  const handleUserSearch = async () => {
    if (searchUser.length > 3 && !(cachedLists.searchUserList && cachedLists.searchUserList[searchUser])) {
      const result = await fetch("http://localhost:3001/searchUsers", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ searchString: searchUser })
      });
      const res = await result.json();
      console.log("user list =>", res.userList);
      dispatch(setCachedLists({
        ...cachedLists,
        searchUserList: {
          ...cachedLists.searchUserList,
          [searchUser]: res.userList
        }
      }));
      setSearchUserList(res.userList);
    }
  }

  useEffect(() => {
    if (searchUser.length > 3) {
      handleUserSearch();
    }
  }, [searchUser])



  return (
    <div className="App">
      <div className='w-full h-screen bg-black flex flex-row'>
        <div className='w-[50%] max-h-full bg-white p-2 relative overflow-scroll'>

          <div className='sticky top-0 bg-white'>
            <div className='w-full border border-black flex align-center items-center'>
              <input type="text"
                className='w-[95%] p-2 focus:outline-none'
                value={searchUser}
                onChange={(e) => { setSearchUser(e.target.value) }}
                placeholder='Search user'
              />
              <div onClick={() => setSearchUser("")}>
                <h1 className='text-xl'> X </h1>
              </div>
            </div>
            {friendRequests?.size > 0 &&
              <div className='mt-2 p-2 border border-black' onClick={() => setShowFriendRequestPage(!showFriendRequestPage)}>
                {
                  !showFriendRequestPage ?
                    <div>New friend requests {friendRequests.size}</div>
                    : <div>Show friend list</div>
                }
              </div>
            }
          </div>

          {showFriendRequestPage ?
            <FriendRequestPage friendRequests={friendRequests} loggedInUser={loggedInUser} />
            :
            searchUserList.length > 0 && searchUser.length > 3 ?
              <SearchList searchUserList={searchUserList} loggedInUser={loggedInUser} />
              :
              loggedInUser && friendList.size > 0 ?
                <div className='flex flex-col flex-start items-start mt-2'>
                  {Array.from(friendList, ([key, value]) => {
                    return (
                      <div className='p-2 border border-black w-full flex flex-start' onClick={() => setSelectedUser(value.user)}>
                        {value.user.name}
                      </div>
                    )
                  })}
                </div>
                :
                <div className='flex justify-center items-center h-screen'>
                  <h2>No users found add some friends</h2>
                </div>
          }
        </div>

        <div className='w-full h-full bg-white'>
          {selectedUser && <ChatComponent selectedUser={selectedUser} loggedInUser={loggedInUser} friendList={friendList} />}
        </div>
      </div>
    </div>
  );
}

export default App;
