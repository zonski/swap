import {Nav} from "./Nav.js";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <Nav />
      <div>
        <Outlet/>
      </div>
    </div>
  );
}
