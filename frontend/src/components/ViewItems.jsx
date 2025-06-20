import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const API = process.env.REACT_APP_API_URI;

Modal.setAppElement("#root");

export default function ViewItems() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(`${API}/items`).then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleEnquire = async () => {
    try {
      await axios.post(`${API}/enquire`, {
        name: selected.name,
        type: selected.type,
        description: selected.description,
      });
      alert("Enquiry email sent!");
    } catch (err) {
      alert("Email failed: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">View Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="border rounded shadow cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <img
              src={item.coverImage}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 text-center font-medium">{item.name}</div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        className="p-6 bg-white max-w-2xl mx-auto mt-20 rounded shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selected && (
          <>
            <button
              onClick={() => setSelected(null)}
              className="float-right text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p className="text-gray-700 mb-2">{selected.type}</p>
            <p className="text-gray-600 mb-4">{selected.description}</p>

            <Swiper spaceBetween={10} slidesPerView={1}>
              {[selected.coverImage, ...selected.additionalImages].map(
                (url, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={url}
                      alt={`Slide ${idx}`}
                      className="w-full h-64 object-cover"
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>

            <button
              onClick={handleEnquire}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Enquire
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}
