import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BlockList = () => {
  let user = useSelector((state) => state.userInfo.value);
  const [blockList, setBlockList] = useState([]);

  let db = getDatabase();
  useEffect(() => {
    const blocklistRef = ref(db, "blocklist/");
    onValue(blocklistRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().blockbyid) {
          array.push({ ...item.val(), id: item.key });
        }
      });

      setBlockList(array);
    });
  }, []);


  let handleUnblock=(item)=>{
        remove(ref(db, "blocklist/" + item.id));
  }

  return (
    <div className="w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Block List</h2>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-y-auto h-[calc(420px-84px)]"
      >
        {blockList.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-x-4 px-5 py-4 transition-all duration-200 "
          >
            <div className="flex items-center gap-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {user.blockuser}
                </p>
                {/* <p className="truncate text-xs text-gray-500">{user.senderemail}</p> */}
              </div>
            </div>

            <button onClick={()=>handleUnblock(user)} class="bg-teal-600 text-white px-5 py-2 rounded-lg ">
              Unblock
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockList;
