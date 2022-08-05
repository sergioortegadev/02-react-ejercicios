import { useModal } from "../hooks/useModal";
import ContactForm from "./ContactForm";
import Modal from "./Modal";
import SongSearch from "./SongSearch";

const Modals = () => {
  // Llamo el hook personalizado, y lo destructuro, refiriéndo las variables de estado y las funciones exclusivas para cada modal. Por eso tengo que llamarlo nuevamente para cada modal que tenga.
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);
  const [isOpenModal3, openModal3, closeModal3] = useModal(false);
  const [isOpenModal4, openModal4, closeModal4] = useModal(false); // si a una initialCondition la ponemos en true, al cargar la página el modal estará abierto. (Como las ventanas de publicidad o avisos de "Aceptar", por ejemplo Cookies)

  return (
    <div>
      <h2>Modales</h2>
      <button onClick={openModal1}>Tech</button>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        {/* La variable de estado y la función para cerrar la paso como propiedad al componente hijo */}
        <h3>Modal 1</h3>
        <p>Hola este es el contenido de mi modal 1.</p>
        <img src="https://placeimg.com/200/200/tech" alt="tech" />
      </Modal>
      <button onClick={openModal2}>People</button>
      <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
        <h3>Otro Modal</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
          repellendus vel nobis nostrum vero dolorum necessitatibus sint
          ducimus, excepturi reiciendis earum dicta officiis porro numquam
          veritatis veniam esse sapiente temporibus! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Blanditiis laborum ex accusamus, at eius
          cum similique quam recusandae impedit temporibus deserunt aspernatur
          expedita perspiciatis beatae doloremque minima est. Molestiae, nulla?
        </p>
        <img src="https://placeimg.com/200/200/people" alt="people" />
      </Modal>
      <button onClick={openModal3}>Buscador Canciones</button>
      <Modal isOpen={isOpenModal3} closeModal={closeModal3}>
        <SongSearch />
      </Modal>
      <button onClick={openModal4}>Contacto</button>
      <Modal isOpen={isOpenModal4} closeModal={closeModal4}>
        <ContactForm />
      </Modal>
    </div>
  );
};

export default Modals;
