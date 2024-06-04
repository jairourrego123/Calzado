import Calendar from '../Calendar/Calendar'
import config from '../../const/config.json'
import './Header.css'
import Clock from '../Clock/Clock';

function Header({title}) {
    console.log("header");

    return (

        
        <div className='stock-genius-header'>
            <h1 className='stock-genius-titles'>{title}</h1>
            <div className='stock-genius-header-user'>
                <Clock/>
                    <img src={'/assets/icons/user-icon.svg'} alt='icono de usuario' className='stock-genius-icon-user' />
                    <div className='stock-genius-info-user'>
                        <span className='stock-genius-name-user stock-genius-sub-titles' style={{WebkitLineClamp: 1 }} >JAIRO MILLER URREGO GARAY</span>
                        <span className='stock-genius-type-user '>Administrador</span>
                    </div>
                
            </div>
        </div>


    )
}

export default Header