import Menu from '../../components/Menu/Menu'
import './Home.css'
function Home() {
  return (
    <div className='stock-genius-container'>
      <div className='stock-genius-content-container-menu'>
        <img className='stock-genius-content-container-menu-hamgurger' src={`../assets/icons/menu.svg`} alt="menu" />
        <div className='stock-genius-menu-container'><Menu /></div>
      </div>
      <div className='stock-genius-content-container'>Content</div>

    </div>
  )
}

export default Home