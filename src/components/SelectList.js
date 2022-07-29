import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";

const SelectList = ({ title, url, handleChange }) => {
  const { data, error, loading } = useFetch(url);
  console.log(data, error, loading);

  if (!data) return null;
  if (error) {
    return (
      <Message
        msg={`Error ${error.status}: ${error.statutText}`}
        bgColor="#bc3545"
      />
    );
  }

  let id = `select-${title}`;
  let label = title.charAt(0).toUpperCase() + title.slice(1) + " "; // tomo title y extraigo el primer caracter, posicion cero con el método charAt(), y luego lo paso a mayúsculas con. Después concateno: lo que le corto a title desde el segundo caracter, la posición 1, con el método slice(), todo lo que queda del string title. Al ultimo un espacio.
  let options = data[title];
  console.log(options);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      {loading && <Loader />}
      <select name={id} id={id} onChange={handleChange}>
        <option value=""> seleccionar {title}</option>
        {data &&
          options.map((el) => <option value={el.nombre}>{el.nombre}</option>)}
      </select>
    </>
  );
};

export default SelectList;
