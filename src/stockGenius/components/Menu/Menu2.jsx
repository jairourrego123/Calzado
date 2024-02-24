import { NavLink } from "react-router-dom"

import './Menu.css'
import IconsMenu from "../IconsMenu/IconsMenu"
function Menu() {
    return (
        <div className="stock-genius-navbar-left">


            <div className="stock-genius-navbar-top">
                <nav className="stock-genius-navbar">
                    <NavLink to="/home">
                        <IconsMenu text={"Home"} />
                    </NavLink>
                    <NavLink to="/inventario">
                        <IconsMenu text={"Inventario"} />
                    </NavLink>
                    <NavLink to="/movimientos">
                        <IconsMenu text={"Movimientos"} />
                    </NavLink>
                    <NavLink to="/gastos">
                        <IconsMenu text={"Gastos"} />
                    </NavLink>
                    <NavLink to="/ganancias">
                        <IconsMenu text={"Ganancias"} />
                    </NavLink>
                    <NavLink to="/extracto">
                        <IconsMenu text={"Extracto"} />
                    </NavLink>
                    <NavLink to="/clientes">
                        <IconsMenu text={"Clientes"} />
                    </NavLink>
                    <NavLink to="/informes">
                        <IconsMenu text={"Informes"} />
                    </NavLink>
                </nav>
            </div>
            <div className="stock-genius-navbar-button">
            <NavLink to="/logout">
                        <IconsMenu text={"Logout"} />
                    </NavLink>
            </div>
        </div>
    )
}

export default Menu