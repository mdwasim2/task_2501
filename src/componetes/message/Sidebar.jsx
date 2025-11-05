import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selecteduser } from "../../slices/messageSlice";

const Sidebar = () => {
  let user = useSelector((state) => state.userInfo.value);
  let selected = useSelector((state) => state.selectedUser.value);
  const dispatch = useDispatch();
  let db = getDatabase();
  let [friendList, setFriendlist] = useState([]);
  useEffect(() => {
    const friendrequestRef = ref(db, "friendlist/");
    onValue(friendrequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          user.uid == item.val().senderid ||
          user.uid == item.val().reciverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendlist(array);
    });
  }, []);

  let handleSelectFriend = (item) => {
    if (user.uid == item.senderid) {
      dispatch(
        selecteduser({
          name: item.recivername,
          email: item.reciveremail,
          id: item.reciverid,
        })
      );
    } else {
      dispatch(
        selecteduser({
          name: item.sendername,
          email: item.senderemail,
          id: item.senderid,
        })
      );
    }
  };

  let handleBlock = (item) => {
    if (user.uid == item.senderid) {
      set(push(ref(db, "blocklist/")), {
        blockbyid: user.uid,
        blockby: user.displayName,
        blockuser: item.recivername,
        blockuserid: item.reciverid,
      }).then(() => {
        remove(ref(db, "friendlist/" + item.id));
      });
    }else{
      set(push(ref(db, "blocklist/")), {
        blockbyid: user.uid,
        blockby: user.displayName,
        blockuser: item.sendername,
        blockuserid: item.senderid,
      }).then(() => {
        remove(ref(db, "friendlist/" + item.id));
      });
    }
  };

  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
        <div className="relative">
          <button id="menuButton" className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </header>
      {/* Contact List */}
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {friendList.map((item) => (
          <div
            className={`flex items-center mb-4 cursor-pointer ${
              item.senderid == selected.id || item.reciverid == selected.id
                ? "bg-green-500"
                : "bg-white"
            }  p-2 rounded-md`}
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              {user.uid == item.senderid ? (
                <>
                  <h2
                    onClick={() => handleSelectFriend(item)}
                    className="text-lg font-semibold"
                  >
                    {item.recivername}
                  </h2>
                  <p className="text-gray-600">{item.reciveremail}</p>
                </>
              ) : (
                <>
                  <h2
                    onClick={() => handleSelectFriend(item)}
                    className="text-lg font-semibold"
                  >
                    {item.sendername}
                  </h2>
                  <p className="text-gray-600">{item.senderemail}</p>
                </>
              )}
              <button
                onClick={() => handleBlock(item)}
                className="bg-blue-700 text-white px-2 py-1"
              >
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
