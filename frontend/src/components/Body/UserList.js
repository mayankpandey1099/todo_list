import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserList = ({ todo, closeUserList }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.isToken);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/user/users", {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectUser = async (id) => {
     const {title, description} = todo;
    try{
        const response = await axios.post(
          `http://localhost:3000/sharedtodolist/${id}`,
          { title, description },
          {
            headers: {
              Authorization: token,
            },
          }
        );
    }catch(error){
        console.error("there was error in sharing the list to user", error);
    }
  };
    return (
    <div className="user-list container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a User to Share</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onSelectUser(user.id)}
                >
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={closeUserList}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default UserList;
