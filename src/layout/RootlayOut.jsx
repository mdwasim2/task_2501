import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import app from "../firebase.Config";
import Nav from "../componetes/home/Nav";

const RootlayOut = () => {
  let navigate = useNavigate();
  let user = useSelector((state) => state.userInfo.value);
  const auth = getAuth(app);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else if (!user.emailVerified) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      {/* <h1>Header</h1> */}

      <Outlet />
      <Nav userinfo={user} />
      {/* <h1>Footer</h1> */}
    </>
  );
};

export default RootlayOut;
