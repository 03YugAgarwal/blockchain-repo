import "./App.css";
import UserRegistration from "./Components/UserRegistration";
import Home from "./Components/Home";
import UserLogin from "./Components/UserLogin";
import {createBrowserRouter, createRoutesFromElements , RouterProvider, Route} from 'react-router-dom'
import GovtView from "./Components/GovtView";
import VehicleRegistration from "./Components/VehicleRegistration";

const routerDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Home />}/>
    <Route path="/new" element={<VehicleRegistration />}/>
    <Route path="/login" element={<UserLogin />}/>
    <Route path="/register" element={<UserRegistration />}/>
    <Route path="/govt" element={<GovtView />}/>
  </Route>
)

const router = createBrowserRouter(routerDefinition)

function App() {

  return <RouterProvider router={router}/>;
}

export default App;
