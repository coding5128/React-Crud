import React, { useState, useEffect } from "react";

const getLocalItem = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState(getLocalItem());
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
        name: "",
        email: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(tableData));
  });

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="min-h-screen bg-[#454694]">
      <h1 className="text-center text-white">Crud App</h1>
      <div className="bg-[#e5e4e4] max-w-fit m-auto p-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col bg">
            <label>Name</label>
            <input name="name" value={inputs.name} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input name="email" value={inputs.email} onChange={handleChange} />
          </div>
          <button type="submit" className="w-full bg-[#148e71] text-white mt-3">
            {editClick ? "update" : "Add"}
          </button>
        </form>
      </div>
      <div>
        <table className="w-full text-center my-8 bg-[#723e99]">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
