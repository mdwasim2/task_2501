import { useSelector } from "react-redux";
import BlockList from "../componetes/home/Blocklist";
import FriendReqeustList from "../componetes/home/FriendRequestList";
import UserList from "../componetes/home/UserList";

const Home = () => {
  let user = useSelector((state) => state.userInfo.value);


  return (
    <main>
      <div className="flex justify-center  gap-10 mt-2">
        <FriendReqeustList />
        <UserList />
        <BlockList/>
      </div>
      {/* <Nav userinfo={user} /> */}
    </main>
  );
};
export default Home;
