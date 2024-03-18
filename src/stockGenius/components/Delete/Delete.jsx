import './Delete.css'
function Delete({onDelete}) {
    return (
        <button className='stock-genius-options stock-genius-component-layout-eliminar' onClick={onDelete}>
            <img src='/assets/icons/eliminar.svg' alt='icon-eliminar' />
            Eliminar
        </button>
    )
}

export default Delete