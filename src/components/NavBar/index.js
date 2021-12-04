import { Link } from "react-router-dom";
import { RiHome2Line, RiLoginBoxLine, RiLogoutBoxLine, RiMenuLine, RiUserAddLine, RiAddLine } from "react-icons/ri"

import { useSelector } from "react-redux";

import './index.css';
const NavBar = ()=>{
  const {isLogged} = useSelector(({security})=>security);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const menu = isLogged ?
    (<ul>
      <li onClick={logout}><Link to="/"><RiLogoutBoxLine /> Salir</Link></li>
      <li><Link to="/inicio"><RiHome2Line /> Inicio</Link></li>
      <li><Link to="/nuevo"><RiAddLine />Nuevo</Link></li>
      <li><Link to="/lista"><RiMenuLine/>Lista</Link></li>
    </ul>) :
    (<ul>
      <li><Link to="/"><RiHome2Line /> Splash</Link></li>
      <li><Link to="/login"><RiLoginBoxLine /> Login</Link></li>
      <li><Link to="/signin"><RiUserAddLine/>Signin</Link></li>
    </ul>);

  return (
    <nav>
     {menu}
    </nav>
  );
}

export default NavBar;
