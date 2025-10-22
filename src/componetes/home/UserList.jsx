import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendrequestId, setFriendrequrestId] = useState([]);
  const [friendId, setFriendId] = useState([]);
  const [loading, setLoading] = useState(true);
  let user = useSelector((state) => state.userInfo.value);

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (item.key != user.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const friendrequestRef = ref(db, "friendrequest/");
    onValue(friendrequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().reciverid);

        setFriendrequrestId(array);
      });
    });
  }, []);
  useEffect(() => {
    const friendrequestRef = ref(db, "friendlist/");
    onValue(friendrequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().reciverid);

        setFriendId(array);

      });
    });
  }, []);

  const handleFndrequrest = (item) => {
    set(push(ref(db, "friendrequest/")), {
      sendername: user.displayName,
      senderid: user.uid,
      senderemail: user.email,
      recivername: item.fullname,
      reciveremail: item.email,
      reciverid: item.id,
    });
  };

  console.log(friendrequestId);
  return (
    <div className="w-sm  h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">User List</h2>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-y-auto h-[calc(420px-84px)]"
      >
        {loading ? (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          userList.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-x-4 px-5 py-4 transition-all duration-200 "
            >
              <div className="flex items-center gap-x-4">
                {item.image ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                  />
                ) : (
                  <img
                    src="https://picsum.photos/seed/picsum/200/300"
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {item.fullname}
                  </p>
                  <p className="truncate text-xs text-gray-500">{item.id}</p>
                </div>
              </div>

              {friendId.includes(user.uid + item.id) ||
                friendId.includes(item.id + user.uid) ?
                <h1>F</h1>
                :


                friendrequestId.includes(user.uid + item.id) ||
                  friendrequestId.includes(item.id + user.uid) ? (
                  <h1>R</h1>
                ) : (
                  <button
                    onClick={() => handleFndrequrest(item)}
                    class="bg-teal-600 cursor-pointer text-white px-5 py-2 rounded-lg "
                  >
                    Add
                  </button>
                )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
