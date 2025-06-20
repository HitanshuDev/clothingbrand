import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URI?.replace(/\/+$/, "");

export default function AddItem() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/items`, {
        ...form,
        coverImage: "",           // empty string since we're not uploading
        additionalImages: [],
      });

      alert("Item successfully added");
      setForm({ name: "", type: "", description: "" });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "type", "description"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        ))}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
