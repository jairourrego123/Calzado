import Calendar from '../Calendar/Calendar'
import './Header.css'

function Header({title}) {


    return (


        <div className='stock-genius-header'>
            <h1 className='stock-genius-header-title'>{title}</h1>
            <div className='stock-genius-header-user'>
                
                <Calendar className="calendar" />
                    <img src={'/assets/icons/user-icon.svg'} alt='icono de usuario' className='stock-genius-icon-user' />
                    <div className='stock-genius-info-user'>
                        <span className='stock-genius-name-user' style={{WebkitLineClamp: 1 }} >JAIRO MILLER URREGO GARAY</span>
                        <span className='stock-genius-type-user'>Administrador</span>
                    </div>
                
            </div>
        </div>


    )
}

export default Header