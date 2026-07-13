import { useEffect } from "react";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react"


function Orders({ osb }) {
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [modul, setModul] =useState(false);
const [newOrder, setNewOrder] = useState({Orderid:"" , quantity:"", Userid:""});
const [editingOrder, setEditingOrder] = useState(null);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch("https://dummyjson.com/carts");

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      setOrders(data.carts);
    } 
    
    catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  if (loading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

const filteredArray = orders.filter((order) =>
  order.id.toString().includes(search) ||
  order.userId.toString().includes(search)
);

const handleSubmit = (e) => {
    e.preventDefault();

    if (editingOrder !== null) {

        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === editingOrder
                    ? {
                        ...order,
                        totalQuantity: Number(newOrder.quantity),
                        userId: Number(newOrder.Userid),
                    }
                    : order
            )
        );

    } else {

        const orderToAdd = {
            id: Number(newOrder.Orderid),
            totalProducts: 1,
            totalQuantity: Number(newOrder.quantity),
            total: 0,
            userId: Number(newOrder.Userid),
            status: "Pending",
        };

        setOrders(prev => [...prev, orderToAdd]);
    }

    setEditingOrder(null);

    setNewOrder({
        Orderid: "",
        quantity: "",
        Userid: "",
    });

    setModul(false);
};
const handleDelete = (id) => {
  setOrders((prevOrders) =>
    prevOrders.filter((order) => order.id !== id)
  );
};


  return (
    <section
      className={`min-h-screen ${
        osb ? "md:ml-[300px]" : "md:ml-0"
      } transition-all duration-300`}
    >
      <div className="m-4 min-h-screen rounded-xl bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Orders</h1>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer" onClick={() => {
            setEditingOrder(null);

            setNewOrder({
              Orderid: "",
              quantity: "",
              Userid: "",
            });

            setModul(true);
          }}>
            Add Order
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search customer..."
            className="rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="rounded-lg border px-4 py-2 outline-none">
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
         <div className="mt-8 overflow-x-auto rounded-lg border">
      <table className="mt-6 w-full border-collapse">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-3 text-left">Order ID</th>
      <th className="p-3 text-left">Products</th>
      <th className="p-3 text-left">Quantity</th>
      <th className="p-3 text-left">Total</th>
      <th className="p-3 text-left">User ID</th>
      <th className="p-3 text-left">status</th>
      <th className="p-3 text-left">Actions</th>
     

    </tr>
  </thead>

  <tbody>
    {filteredArray.map((order) => (
      <tr key={order.id} className="border-b hover:bg-gray-50">
        <td className="p-3">#{order.id}</td>
        <td className="p-3">{order.totalProducts}</td>
        <td className="p-3">{order.totalQuantity}</td>
        <td className="p-3">${order.total}</td>
        <td className="p-3">{order.userId}</td>
        <td className="p-3">{order.status}</td>
       <td className="p-4">
  <div className="flex items-center gap-2">
    <button className="rounded p-2 hover:bg-blue-100 transition cursor-pointer" onClick={() => {
  setModul(true);
  setEditingOrder(order.id);

  setNewOrder({
    Orderid: order.id,
    quantity: order.totalQuantity,
    Userid: order.userId,
  });
}}
>
      <Edit size={18}  />
    </button>

    <button className="rounded p-2 hover:bg-red-100 transition cursor-pointer" onClick={() => {
      handleDelete(order.id)
    }}>
      <Trash2 size={18}  />
    </button>
  </div>
</td>

      </tr>
    ))}
  </tbody>
</table>
</div>
      </div>
      {modul && 
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setModul(false)}>
        <div className="w-[400px] inset-0 bg-white rounded-xl p-4 "  onClick={(e) => e.stopPropagation()}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="name" className="font-bold">Order number:</label>
            <input type="text" className="py-1 px-2 border rounded" value={newOrder.Userid} onChange={(e) => setNewOrder({...newOrder, Userid: e.target.value})}/>
            <label htmlFor="products" className="font-bold">Products:</label>
            <input type="text" className="border rounded py-1 px-2" value={newOrder.Orderid} onChange={(e) => setNewOrder({...newOrder, Orderid : e.target.value})}/>
            <label htmlFor="Quantity" className="font-semibold">Quantity:</label>
            <input type="text" className="border rounded py-1 px-2" value={newOrder.quantity} onChange={(e) => setNewOrder({...newOrder, quantity:e.target.value})}/>
            <button
  type="submit"
  className="bg-blue-800 py-2 rounded font-bold text-xl cursor-pointer"
>
  {editingOrder !== null ? "Save Changes" : "Add Order"}
</button>
          </form>
        </div>
        </div>}
    </section>
  );
}

export default Orders;
