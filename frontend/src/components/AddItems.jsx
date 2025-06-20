import { useState } from "react";
import axios from "axios";

export default function AddItem() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      images.forEach((file) => formData.append("images", file));

      const uploadRes = await axios.post("http://localhost:5000/upload", formData);
      const urls = uploadRes.data.imageUrls;

      const payload = {
        ...form,
        coverImage: urls[0],
        additionalImages: urls.slice(1),
      };

      await axios.post("http://localhost:5000/items", payload);
      alert("Item successfully added");

      setForm({ name: "", type: "", description: "" });
      setImages([]);
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

        <div>
          <label className="block mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="block w-full"
            required
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
