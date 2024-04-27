import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// toast library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

//layouts
import Main,{mainLoader} from "./layouts/main";
//Actions
import { logoutAction } from "./actions/logout";


//In createBrowserRouter, we have different options like actions,loaders and error elements
const router = createBrowserRouter([
  {
    path: "/",    //Where to look at
    element:<Main/>,    //what to show
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
      {
        index:true,
        element:<Dashboard/>,    //what to show in the outlet
        loader: dashboardLoader,
        action:dashboardAction,
        errorElement: <Error/>
      },
      
      {
        path:"logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <div className="App">
  <RouterProvider router={router} />
  <ToastContainer/>
  </div>
}

export default App;
