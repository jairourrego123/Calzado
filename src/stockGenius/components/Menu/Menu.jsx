import { NavLink } from "react-router-dom"

import './Menu.css'
import config from '../../const/config.json'

import IconsMenu from "../IconsMenu/IconsMenu"
function Menu() {

    return (
        <>
            <div className="stock-genius-icon">
                <img src="/assets/icons/icon.png" alt="logo"  width={40} height={40}/>
            </div>
            <div className="stock-genius-menu">
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
                    <NavLink to={`/${config.routerPrincipal}/extractos`}>
                        <IconsMenu text={"Extractos"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/usuarios`}>
                        <IconsMenu text={"Usuarios"} />
                    </NavLink>
                    <NavLink to={`/${config.routerPrincipal}/informes`}>
                        <IconsMenu text={"Informes"} />
                    </NavLink>
                </nav>
            </div>
            <div className="stock-genius-logout">
                <nav>
                <NavLink to="/logout">
                    <IconsMenu text={"Logout"} />
                </NavLink>
                </nav>
            </div>


        </>
    )
}

export default Menu