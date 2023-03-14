import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import Clients from "./api/Clients";
import Pieces from "./api/Pieces";

const App = () => {
  const [clients, setClients] = useState([]);
  const [pieces, setPieces] = useState([]);

  const fetchClients = async () => {
    const results = await Clients.getAll();
    setClients(results);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchPieces = async ({ clientId, sortBy, search }) => {
    const params = {
      ...(clientId && { clientId }),
      ...(sortBy && { _sort: sortBy }),
      ...(search && { name: search }),
    };
    const results = await Pieces.getAll(params);
    setPieces(results);
  };

  return (
    <div>
      <h1>Search Gallery</h1>
      <Formik
        initialValues={{ clientId: "", sortBy: "name", search: "" }}
        onSubmit={(values, actions) => {
          console.log(values);
          fetchPieces(values);
        }}
      >
        <Form>
          <label>Client Name:</label>
          <Field as="select" name="clientId">
            <option value="">All</option>
            {clients.map((client) => {
              return (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              );
            })}
          </Field>
          <label>Sort By:</label>
          <Field as="select" name="sortBy">
            <option value="date">Date</option>
            <option value="client">Client</option>
            <option value="name">Name</option>
          </Field>
          <label>Search:</label>
          <Field type="text" name="search" placeholder="Search" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <div>
        <h2>Pieces</h2>
        {pieces.map((piece) => {
          return (
            <p key={piece.id}>
              {piece.clientId}-{piece.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default App;
