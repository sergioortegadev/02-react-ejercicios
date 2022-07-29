import React, { useState } from "react";
import SelectList from "./SelectList";

const SelectsAnidados = () => {
  const [state, setState] = useState("");
  const [town, setTown] = useState("");

  return (
    <div className="select-anidados">
      <h3>Select Anidados</h3>
      <h4>Argentina</h4>
      <SelectList
        title="provincias"
        url="https://apis.datos.gob.ar/georef/api/provincias"
        handleChange={(e) => {
          setState(e.target.value);
        }}
      />
      {state && (
        <SelectList
          title="municipios"
          url={`https://apis.datos.gob.ar/georef/api/municipios?provincia=${state}&aplanar&max=5000`}
          handleChange={(e) => {
            setTown(e.target.value);
          }}
        />
      )}
      <br />

      <pre>
        <code>
          {state} - {town}
        </code>
      </pre>
    </div>
  );
};

export default SelectsAnidados;
