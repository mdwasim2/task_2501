import { createBrowserRouter, RouterProvider } from "react-router";
import Signin from './componetes/Signin';
import Signup from './componetes/Signup';
import RootlayOut from './layout/RootlayOut';
import About from './pages/About';
import Home from './pages/Home';


const App = () => {
 let routing = createBrowserRouter([
  {
    path: "/",
    Component: RootlayOut,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
     
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
   <RouterProvider router={routing}/>
   </>
  )
}

export default App