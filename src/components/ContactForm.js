import { useForm } from "../hooks/useForm";
import Loader from "./Loader";
import Message from "./Message";
// Para agregar campos al formulario: el <input> de la UI, el {conditional render && para el mensaje de error}, y los if() en validationForm

const initialForm = {
  name: "",
  email: "",
  subject: "",
  comments: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  if (!form.name.trim()) {
    // método .trim() para omitir cualquier caracter en blanco al comienzo y final
    errors.name = "El campo 'nombre' es requerido";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'nombre' sólo acepta letras y espacios";
  }
  if (!form.email.trim()) {
    errors.email = "El campo 'email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El email ingresado no es válido";
  }
  if (!form.subject.trim()) {
    errors.subject = "El campo 'asunto' es requerido";
  }
  if (!form.comments.trim()) {
    errors.comments = "El campo 'mensaje' es requerido";
  } else if (!regexComments.test(form.comments.trim())) {
    errors.comments = "Este espacio recibe hasta 255 caracteres";
  }

  return errors;
};

let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};

const ContactForm = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  return (
    <div>
      <h3>Formulario de contacto</h3>
      {loading && <Loader />}
      {response && <Message msg="El mensaje se envió" bgColor="#198754" />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Escribe tu nombre"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.name}
          required
        />
        {errors.name && <p style={styles}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Escribe tu email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.email}
          required
        />
        {errors.email && <p style={styles}>{errors.email}</p>}
        <input
          type="text"
          name="subject"
          placeholder="Asunto a tratar"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.subject}
          required
        />
        {errors.subject && <p style={styles}>{errors.subject}</p>}
        <textarea
          name="comments"
          cols="50"
          rows="5"
          placeholder="Escribe tu mensaje aquí"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.comments}
          required
        ></textarea>
        {errors.comments && <p style={styles}>{errors.comments}</p>}
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default ContactForm;
