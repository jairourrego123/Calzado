import Modal from 'react-modal';
import './GeneralModal.css'; // Importa el archivo CSS

function GeneralModal({ isOpen, onClose,icon,title, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="stock-genius-modal-content" // Agrega la clase al contenido del modal
    //   overlayClassName="modal-overlay" // Agrega la clase a la capa que cubre la pantalla
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
          height: '300px',
          borderRadius: '10px',
        },
      }}
    >
    <div className="stock-genius-component-modal-header">
        <img src={`../../assets/icons/${icon}.svg`} alt="icon-modal" />
        <h1>{title}</h1>
        <button className="modal-close-button" onClick={onClose}>X</button>
    </div>
      {children}
    </Modal>
  );
};

export default GeneralModal;