import './Delete.css'
import {ReactComponent as DeleteIcon} from '../../../assets/icons/eliminar.svg'

function Delete({onDelete}) {
    return (
        <div className='stock-genius-options stock-genius-component-layout-eliminar' onClick={onDelete}>
            <DeleteIcon />
            Eliminar 
        </div>
    )
}

export default Delete