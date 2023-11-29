export const Filter = ({ filter, setFilter }) => {
  return (
    <div className="d-flex">
      <label className="me-3">Search:</label>
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};
