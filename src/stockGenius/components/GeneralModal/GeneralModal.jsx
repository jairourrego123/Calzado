import Modal from 'react-modal';
import './GeneralModal.css'; // Importa el archivo CSS

function GeneralModal({ isOpen, onClose,icon,title, layout, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="stock-genius-modal-content" // Agrega la clase al contenido del modal
    //   overlay7ClassName="modal-overlay" // Agrega la clase a la capa que cubre la pantalla
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex:1
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
        //   height: '300px',
            
          borderRadius: '10px',
        },
      }}
    >
    <div className="stock-genius-component-modal-header">
        <img src={`/assets/icons/${icon}.svg`} alt="icon-modal" className='stock-genius-modal-icon'/>
        <div className="stock-genius-component-modal-header-container">
        <h1 className='stock-genius-titles stock-genius-component-modal-title'>{title}</h1>
        <span className='stock-genius-layout' style={{paddingLeft: "1.25rem"}}>{layout}</span>
        </div>
        <img className="stock-genius-modal-close" src='/assets/icons/close.svg' alt='icon-close' onClick={onClose}/>
    </div>
      {children}
    </Modal>
  );
};

export default GeneralModal;