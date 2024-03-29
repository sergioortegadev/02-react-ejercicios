import { useState, useEffect } from "react";
// Hoop personalizado que ejecuta la petición (Fetch) en una función de efecto (useEffect), y me devuelve: {data, error, y loading (estado de carga)}. Nos sirve para que el componente no tenga tantas líneas de código.
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          let err = new Error("Error en la petición Fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Ocurrió un error no informado";
          throw err;
        }

        const json = await res.json();

        if (!signal.aborted) {
          setData(json);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort(); // Si la API demora mucho cancelamos la petición Fetch, y con una arrow func en el return del useEffect desmontamos el componente.
  }, [url]);

  return { data, error, loading };
};
