import { useSelector } from "react-redux";
import Nav from "../componetes/home/Nav";
import UserList from "../componetes/home/UserList";
import FriendReqeustList from "../componetes/home/FriendRequestList";

const Home = () => {
  let user = useSelector((state) => state.userInfo.value);


  return (
    <main>
      <div className="flex justify-center  gap-10 mt-2">
        <FriendReqeustList />
        <UserList />
      </div>
      {/* <Nav userinfo={user} /> */}
    </main>
  );
};
export default Home;
