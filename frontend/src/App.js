import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCachedLists } from './Slices/userSlice';
import { makeApiCall } from './api/api';
import { useNavigate } from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const navigate = useNavigate();

  const cachedLists = useSelector(state => state.user.cachedLists);

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

  useEffect(() => {
    if (searchUser.length > 3) {
      handleUserSearch();
    }
  }, [searchUser])

  return (
    <div className="App">
      <div className='w-full h-screen bg-black flex flex-row'>
        <div className='w-[50%] h-full bg-white p-2'>
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
          {searchUserList.length > 0 && searchUser.length > 3 ?
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
                          <div>Add</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            : userData.length > 0 ? <h3>users found</h3>
              :
              <div className='flex justify-center items-center h-full'>
                <h2>No users found add some friends</h2>
              </div>
          }
        </div>
        <div className='w-full h-full bg-red-500'>

        </div>
      </div>
    </div>
  );
}

export default App;
