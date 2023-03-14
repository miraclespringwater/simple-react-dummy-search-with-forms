import { useId, useEffect, useState, useCallback } from "react";
import GalleryList from "../components/GalleryList";
import Pieces from "../api/Pieces";
import Clients from "../api/Clients";
import Select from "../components/Select";
import useFilter from "../hooks/useFilter";

const clients = [
  {
    id: 1,
    name: "Awesome Artist",
  },
  {
    id: 2,
    name: "Cool Company",
  },
  {
    id: 3,
    name: "Rare Rapper",
  },
];

const GalleryPage = () => {
  const [items, setItems] = useState([]);

  const {
    values: { client, sortBy },
    register,
    formRef,
  } = useFilter({
    defaultValues: {
      client: "",
      sortBy: "",
    },
    resetValueWhen: {
      sortBy: (formData) => formData.client && formData.sortBy === "client",
    },
  });

  const clientOptions = (
    <>
      <option value="">...</option>
      {clients.map((client) => {
        return (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        );
      })}
    </>
  );

  const sortByOptions = (
    <>
      <option value="">...</option>
      {!client && <option value="client">Client</option>}
      <option value="name">Name</option>
      <option value="date">Date</option>
    </>
  );

  return (
    <div>
      <form ref={formRef}>
        <label>Client Name:</label>
        <select {...register("client")}>{clientOptions}</select>
        <label>Sort By:</label>
        <select {...register("sortBy")}>{sortByOptions}</select>
      </form>
      <div>
        <p>Selected Client: {client}</p>
        <p>Selected Sort: {sortBy}</p>
      </div>
    </div>
  );
};

// const GalleryPage = () => {
//   const { state, filterState } = useFilter();
//
//
//   const [pieces, setPieces] = useState([]);
//
//   const [clientOptions, setClientOptions] = useState([]);
//   const [sortOptions, setSortOptions] = useState(initialSortByOptions);
//
//   const [clientId, setClientId] = useState(null);
//   const [sortBy, setSortBy] = useState("");
//
//   const inputId = useId();
//
//   const fetchPieces = useCallback(async () => {
//     const params = {
//       ...(clientId && { clientId }),
//       ...(sortBy && { _sort: sortBy }),
//     };
//     const results = await Pieces.getAll(params);
//     setPieces(results);
//   }, [clientId, sortBy]);
//
//   const fetchClients = async () => {
//     const results = await Clients.getAll();
//     setClientOptions(
//       results.map((client) => ({ value: client.id, label: client.name }))
//     );
//   };
//
//   const handleClientChange = (event) => {
//     const { value } = event.target;
//     if (value !== "") {
//       // Remove client option
//       setSortOptions((options) =>
//         options.filter((option) => option.value !== "client")
//       );
//       setSortBy((sortBy) => (sortBy === "client" ? "" : sortBy));
//     } else {
//       setSortOptions(initialSortByOptions);
//     }
//     setClientId(value);
//   };
//
//   const handleSortByChange = (event) => {
//     setSortBy(event.target.value);
//   };
//
//   useEffect(() => {
//     fetchClients();
//   }, []);
//
//   useEffect(() => {
//     fetchPieces();
//   }, [fetchPieces]);
//
//   return (
//     <div>
//       <form className="gallery__filter">
//         <label htmlFor={`${inputId}-clientName`}>Client Name:</label>
//         <Select
//           id={`${inputId}-clientName`}
//           name="clientId"
//           onChange={handleClientChange}
//           options={clientOptions}
//           defaultSelection={{ value: "", label: "Select a client..." }}
//         />
//         <label htmlFor={`${inputId}-sortBy`}>Sort By:</label>
//         <Select
//           id={`${inputId}-sortBy`}
//           name="sortBy"
//           onChange={handleSortByChange}
//           options={sortOptions}
//           defaultSelection={{ value: "", label: "..." }}
//         />
//       </form>
//
//       <GalleryList items={pieces} />
//     </div>
//   );
// };

export default GalleryPage;
