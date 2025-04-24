// eslint-disable-next-line
import Calendar from '../Calendar/Calendar'
import './Header.css'
import Clock from '../Clock/Clock';

function Header({title}) {
    //console.log("header");
    const {username,rol} = JSON.parse(localStorage.getItem('usuario'))
   
    return (

        
        <div className='stock-genius-header'>
            <h1 className='stock-genius-titles'>{title}</h1>
            <div className='stock-genius-header-user'>
                <Clock/>
                    <img src={'/stock/assets/icons/user-icon.svg'} alt='icono de usuario' className='stock-genius-icon-user' />
                    <div className='stock-genius-info-user'>
                        <span className='stock-genius-name-user stock-genius-sub-titles' style={{WebkitLineClamp: 1 }} >{ username}
                            
                        </span>
                        <span className='stock-genius-type-user '>{rol}</span>
                    </div>
                
            </div>
        </div>


    )
}

export default Header