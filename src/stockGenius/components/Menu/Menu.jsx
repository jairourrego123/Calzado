import { NavLink, useNavigate } from "react-router-dom"

import './Menu.css'
import config from '../../const/config.json'

import IconsMenu from "../IconsMenu/IconsMenu"
import { SweetAlertConfirm } from "../SweetAlert/SweetAlert"


function Menu() {
    const navigate = useNavigate()

    const handleLogOut = () => {
            SweetAlertConfirm("¡Su sesion se cerrará!")
            .then((result)=>{
              if (result.isConfirmed) {
                navigate("/")
              }              
          })      
            
          }

    
    return (
        <>
            <div className="stock-genius-icon">
                <img src="../../../assets/icons/icon.svg" alt="logo"  width={40} height={40}/>
            </div>
            <div className="stock-genius-menu">
                <nav className="stock-genius-navbar">

                    <NavLink to={`${config.routerPrincipal}/home`}>
                        <IconsMenu text={"Home"} />
                    </NavLink>
                    <NavLink to={`${config.routerPrincipal}/inventario`}>
                        <IconsMenu text={"Inventario"} />
                    </NavLink>
                    <NavLink to={`${config.routerPrincipal}/movimientos`}>
                        <IconsMenu text={"Movimientos"} />
                    </NavLink>
                    <NavLink to={`${config.routerPrincipal}/gastos`}>
                        <IconsMenu text={"Gastos"} />
                    </NavLink>
                    <NavLink to={`${config.routerPrincipal}/ganancias`}>
                        <IconsMenu text={"Ganancias"} />
                    </NavLink>
                    <NavLink to={`${config.routerPrincipal}/balances`}>
                        <IconsMenu text={"Balances"} />
                    </NavLink>
                    <NavLink to={`${config.routerPrincipal}/usuarios`}>
                        <IconsMenu text={"Usuarios"} />
                    </NavLink>
                    <NavLink to={`${config.routerPrincipal}/informes`}>
                        <IconsMenu text={"Informes"} />
                    </NavLink>
                </nav>
            </div>
            <div className="stock-genius-logout" onClick={handleLogOut}>
                    <IconsMenu text={"Logout"}   />
            </div>


        </>
    )
}

export default Menu