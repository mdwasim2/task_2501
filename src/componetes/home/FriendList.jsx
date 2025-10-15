const users = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    role: "User",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

const FriendList = () => {
  return (
    <div className="max-w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Friend List</h2>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-y-auto h-[calc(420px-84px)]"
      >
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-x-4 px-5 py-4 transition-all duration-200 "
          >
            <div className="flex items-center gap-x-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                />
              ) : (
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <button class="bg-teal-600 text-white px-5 py-2 rounded-lg ">
              Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
