import {NavLink} from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <NavLink to='/'>Home</NavLink>
      &nbsp;| <NavLink to='/thing'>Things</NavLink>
    </div>
  );
}
