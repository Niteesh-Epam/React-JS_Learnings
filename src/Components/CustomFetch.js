import React, { useDebugValue } from "react";

export const useFetch = ({ url, options = {}, dependencies = [] }) => {
  const [loading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  useDebugValue(error ? "error" : "value");
  const Callbackfn = () => {
    setIsLoading(true);
    return fetch(url, options)
      .then((res) => res.json())
      .then(setValue)
      .catch(setError)
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    Callbackfn();
  }, dependencies);

  return { loading, value, error };
};
