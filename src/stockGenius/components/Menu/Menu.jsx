import { NavLink } from "react-router-dom"

import './Menu.css'
import config from '../../const/const.json'

import IconsMenu from "../IconsMenu/IconsMenu"
function Menu() {

    return (
        <div className="stock-genius-navbar-left">

            {/* <img className='stock-genius-navbar-close' src={`../assets/icons/menu.svg`} alt="menu" /> */}
            <div className="stock-genius-navbar-top">
                <nav className="stock-genius-navbar">

                    <NavLink to={`/${config.routerPrincipal}/home`}>
                        <IconsMenu text={"Home"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/inventario`}>
                        <IconsMenu text={"Inventario"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/movimientos`}>
                        <IconsMenu text={"Movimientos"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/gastos`}>
                        <IconsMenu text={"Gastos"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/ganancias`}>
                        <IconsMenu text={"Ganancias"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/extracto`}>
                        <IconsMenu text={"Extracto"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/clientes`}>
                        <IconsMenu text={"Clientes"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/informes`}>
                        <IconsMenu text={"Informes"} />
                    </NavLink>
                </nav>
            </div>
            <div className="stock-genius-navbar-logout">
                <NavLink to="/logout">
                    <IconsMenu text={"Logout"} />
                </NavLink>
            </div>
        </div>
    )
}

export default Menu