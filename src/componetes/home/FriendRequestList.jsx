import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const FriendReqeustList = () => {
  let user = useSelector((state) => state.userInfo.value);
  const [friendrequestList, setFriendrequrestList] = useState([])


  let db = getDatabase()
  useEffect(() => {
    const friendrequestRef = ref(db, "friendrequest/");
    onValue(friendrequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {

        if (user.uid == item.val().reciverid) {

          array.push({ ...item.val(), id: item.key });

        }

      });
      setFriendrequrestList(array)
    });
  }, []);


  let handleAccept = (item) => {

    set(push(ref(db, "friendlist/")), {
      ...item
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id))
    })
  }
  return (
    <div className="w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Friend Request List</h2>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-y-auto h-[calc(420px-84px)]"
      >
        {friendrequestList.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-x-4 px-5 py-4 transition-all duration-200 "
          >
            {console.log(user)}
            <div className="flex items-center gap-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {user.sendername}
                </p>
                <p className="truncate text-xs text-gray-500">{user.senderemail}</p>
              </div>
            </div>

            <button onClick={() => handleAccept(user)} class="bg-teal-600 text-white px-5 py-2 rounded-lg ">
              Accept
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendReqeustList;
