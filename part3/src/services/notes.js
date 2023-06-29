import Axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";
//Obtiene todas las notas
const getAll = () => {
  const request = Axios.get(baseUrl);
  return request.then((response) => response.data);
};
//Permite crear nuevas notas
const create = (newObject) => {
  const request = Axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};
//Permite modificar todas las propiedades de las notas
const update = (id, newObject) => {
  const request = Axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
};
