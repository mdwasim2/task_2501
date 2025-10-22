import { createBrowserRouter, RouterProvider } from "react-router";
import Signin from './componetes/Signin';
import Signup from './componetes/Signup';
import RootlayOut from './layout/RootlayOut';
import Home from './pages/Home';
import Message from "./pages/Message";


const App = () => {
  let routing = createBrowserRouter([
    {
      path: "/",
      Component: RootlayOut,
      children: [
        { index: true, Component: Home },
        { path: "message", Component: Message },

      ],
    },
    {
      path: "/Signup",
      Component: Signup,

    },
    {
      path: "/Signin",
      Component: Signin,

    },
  ]);

  return (
    <>
      <RouterProvider router={routing} />
    </>
  )
}

export default App