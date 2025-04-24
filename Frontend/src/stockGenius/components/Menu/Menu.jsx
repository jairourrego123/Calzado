import { NavLink, useNavigate } from "react-router-dom";
import './Menu.css';
import config from '../../const/config.json';

import MenuIcon from "../IconsMenu/IconsMenu";
import { SweetAlertConfirm } from "../SweetAlert/SweetAlert";
import { ReactComponent as AppIcon } from "../../../assets/icons/icon.svg";
import { logout } from "../../services/autenticacion/autenticacion";

function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await SweetAlertConfirm("¡Su sesión se cerrará!", "¿Está seguro de cerrar sesión?");
      if (result.isConfirmed) {
        await logout();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="stock-genius-icon">
        <AppIcon />
      </div>
      <div className="stock-genius-menu">
        <nav className="stock-genius-navbar">
          <NavLink  to={`${config.routerPrincipal}/main/home`}>
            <MenuIcon text="Home" />
          </NavLink>
          <NavLink  to={`${config.routerPrincipal}/main/inventario`}>
            <MenuIcon text="Inventario" />
          </NavLink>
          <NavLink  to={`${config.routerPrincipal}/main/movimientos`}>
            <MenuIcon text="Movimientos" />
          </NavLink>
          <NavLink  to={`${config.routerPrincipal}/main/gastos`}>
            <MenuIcon text="Gastos" />
          </NavLink>
          <NavLink  to={`${config.routerPrincipal}/main/ganancias`}>
            <MenuIcon text="Ganancias" />
          </NavLink>
          <NavLink  to={`${config.routerPrincipal}/main/balances`}>
            <MenuIcon text="Balances" />
          </NavLink>
          <NavLink  to={`${config.routerPrincipal}/main/usuarios`}>
            <MenuIcon text="Usuarios" />
          </NavLink>
          <NavLink  to={`${config.routerPrincipal}/main/informes`}>
            <MenuIcon text="Informes" />
          </NavLink>
        </nav>
      </div>
      <div className="stock-genius-logout" onClick={handleLogout}>
        <MenuIcon text="Logout" />
      </div>
    </>
  );
}

export default Menu;