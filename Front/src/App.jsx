import { useRoutes, BrowserRouter } from "react-router-dom";

import { Navbar } from "./Components/Navbar/Navbar";
import { Vuelos } from "./Pages/Vuelos/Vuelos";
import { Login } from "./Pages/Login/Login";
import {usePageTitle} from "./hooks/usePageTitle";
// import {Users} from "./Pages/Users/Users";

function AppRoutes() {
  usePageTitle();
  let routes = useRoutes ([
    { path: "/vuelos", element: < Vuelos/>},
    { path: "/login", element: <Login /> },
    // { path: "/users", element: <Users /> },
  ]);
  return routes
}

const App = () => {
  
  return (
    <BrowserRouter>
    <Navbar/>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App
