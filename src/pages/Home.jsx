import { useSelector } from "react-redux";
import FriendList from "../componetes/home/FriendList";
import Nav from "../componetes/home/Nav";
import UserList from "../componetes/home/UserList";

const Home = () => {
  let user = useSelector((state) => state.userInfo.value);


  return (
    <main>
      <div className="flex justify-center  gap-10 mt-2">
        <FriendList />
        <UserList />
      </div>
      <Nav userinfo={user} />
    </main>
  );
};
export default Home;
