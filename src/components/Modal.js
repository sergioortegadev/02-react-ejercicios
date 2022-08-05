import "./Modal.css";

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation(); // Detengo propagación para que no cierre el modal cuanto toca el div que hace a la ventana del modal, pero si se cierre cuando hace click en el resto de la pantalla, o sea al article.

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button onClick={closeModal} className="modal-close">
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default Modal;
