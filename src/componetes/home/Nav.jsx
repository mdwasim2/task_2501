import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../../slices/userSlice";


const Nav = ({ userinfo }) => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [active, setActive] = useState("home");
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false)


  const navItems = [
    { id: "", icon: <FaHome />, label: "Home" },
    { id: "message", icon: <MdMessage />, label: "Messages" },
    { id: "profile", icon: <IoPersonCircle />, label: "Profile" },
    { id: "logout", icon: <IoMdLogOut />, label: "Logout" },
  ];

  const handleNavClick = (item) => {


    setActive(item.id);
    if (item.id === "profile") {
      setShowModal(true);
    } else if (item.id === "logout") {
      setShowLogoutModal(true)
    } else {
      navigate(`/${item.id}`)
      setShowModal(false);
      setShowLogoutModal(false);
    }


  };


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user")
        dispatch(addUser(null))
        navigate("/signin")
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <>
      {/* Floating Bottom Nav */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-8 bg-teal-800/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-teal-700/40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center transition-all duration-200 ${active === item.id
                ? "scale-110"
                : "opacity-80 hover:opacity-100"
                }`}
            >
              <span
                className={`text-3xl transition-colors ${active === item.id ? "text-white" : "text-gray-300"
                  }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-medium mt-1 ${active === item.id ? "text-white" : "text-gray-400"
                  }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[320px] p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Profile
            </h2>
            <div className="flex items-center gap-3">
              <img
                src={userinfo?.photoURL}
                alt="User avatar"
                className="h-12 w-12 rounded-full border border-gray-200 object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {userinfo?.displayName}
                </p>
                <p className="text-sm text-gray-500">{userinfo?.email}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[320px] p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Profile
            </h2>
            <div className="flex items-center gap-3">
              <img
                src={userinfo?.photoURL}
                alt="User avatar"
                className="h-12 w-12 rounded-full border border-gray-200 object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {userinfo?.displayName}
                </p>
                <p className="text-sm text-gray-500">{userinfo?.email}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm font-medium bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition"
              >
                Close
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium ml-3 bg-red-700 text-white rounded-lg hover:bg-teal-800 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
