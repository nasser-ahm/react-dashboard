import { Search } from "lucide-react"
import Productstable from "../Components/Productstable";
import { useEffect, useState } from "react";


function Products({osb}) {
  const [search, setSearch] = useState("");
  const [Selected, setSelected] =useState("All");
  const [products, setProducts] =useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
  title: "",
  price: "",
  category: "",
  stock: "",
  thumbnail: "",
});

 useEffect(() => {
  fetch("https://dummyjson.com/products?limit=0").then(res => res.json())
  .then((data) => {
    setProducts(data.products)
  });
 }, []);

const filteredProducts = products.filter((product) => {
  const matchesSearch = product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    Selected === "All" || product.category === Selected;

  return matchesSearch && matchesCategory;
});

const productsPerPage = 20;
const [currentPage, setCurrentPage] = useState(1);
const lastProductIndex = currentPage * productsPerPage;
const firstProductIndex = lastProductIndex - productsPerPage;

const currentProducts = filteredProducts.slice(
  firstProductIndex,
  lastProductIndex
);
const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);
const handleAddProduct = (e) => {
  e.preventDefault();

  const product = {
    id: Date.now(),
    ...newProduct,
  };

  setProducts((prev) => [product, ...prev]);

  setNewProduct({
    title: "",
    price: "",
    category: "",
    stock: "",
    thumbnail: "",
  });

  setShowModal(false);
};
const handleDeleteProduct = (id) => {
  setProducts((prev) =>
    prev.filter((product) => product.id !== id)
  );
};
const handleEditClick = (product) => {
  setEditingProduct(product);

  setNewProduct({
    title: product.title,
    price: product.price,
    category: product.category,
    stock: product.stock,
    thumbnail: product.thumbnail,
  });

  setShowModal(true);
};
const handleUpdateProduct = (e) => {
  e.preventDefault();

  setProducts((prev) =>
    prev.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            ...newProduct,
          }
        : product
    )
  );

  setEditingProduct(null);

  setNewProduct({
    title: "",
    price: "",
    category: "",
    stock: "",
    thumbnail: "",
  });

  setShowModal(false);
};
  return (
    <section className={`min-h-screen ${osb ? "md:ml-[300px]" : "md:ml-[0px]"} transition-all duration-300 `}>
      <div className=" rounded-xl  m-4 min-h-screen bg-white shadow p-4">
         <h3 className="text-2xl underline p-4 font-semibold ">products</h3>
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => {
  setEditingProduct(null);

  setNewProduct({
    title: "",
    price: "",
    category: "",
    stock: "",
    thumbnail: "",
  });

  setShowModal(true);
}}>+ Add a product</button>
            <form className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <Search size={18}/>
            <input
                type="text"
                value={search}
                placeholder="Search products..."
                className="outline-none  w-64"
                onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);} }
            />
            </form>
            <select className="border rounded-lg px-3 py-2" value={Selected} onChange={(e) => {setSelected(e.target.value);  setCurrentPage(1);}}>
                <option>All</option>
                <option>smartphones</option>
                <option>laptops</option>
                <option>furniture</option>
                <option>groceries</option>
                <option>tops</option>
            </select>

         </div>
    <Productstable products={currentProducts} onDelete={handleDeleteProduct} onEdit={handleEditClick} />
        <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 py-1 rounded ${
      currentPage === index + 1
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    } cursor-pointer`}
        >
          {index + 1}
        </button>
  ))}
</div>
    </div>
    {/*add product popup */}
    {showModal && (
  <div
    className="fixed inset-0 bg-black/50 flex justify-center items-center"
    onClick={() => {
  setShowModal(false);
  setEditingProduct(null);

  setNewProduct({
    title: "",
    price: "",
    category: "",
    stock: "",
    thumbnail: "",
  });
}}
  >
    <div
      className="bg-white p-6 rounded-lg w-[450px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

     <form className="flex flex-col gap-4" onSubmit={
  editingProduct
    ? handleUpdateProduct
    : handleAddProduct
}>

  <input
    type="text"
    placeholder="Product Name"
    className="border p-2 rounded"
    value={newProduct.title}
    onChange={(e) => {
      setNewProduct({
        ...newProduct,
        title: e.target.value,
      });
    }}
  />

  <input
    type="number"
    placeholder="Price"
    className="border p-2 rounded"
    value={newProduct.price}
     onChange={(e) => {
      setNewProduct({
        ...newProduct,
        price: e.target.value,
      });
    }}
  />

  <input
    type="text"
    placeholder="Category"
    className="border p-2 rounded"
    value={newProduct.category}
    onChange={(e) => {
      setNewProduct({...newProduct, category: e.target.value});
    }}
  />

  <input
    type="number"
    placeholder="Stock"
    className="border p-2 rounded"
     value={newProduct.stock}
    onChange={(e) => {
      setNewProduct({...newProduct, stock: e.target.value});
    }}
  />

  <input
    type="text"
    placeholder="Image URL"
    className="border p-2 rounded"
     value={newProduct.thumbnail}
    onChange={(e) => {
      setNewProduct({...newProduct, thumbnail: e.target.value});
    }}
  />

  <button
    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    type="submit"
  >
    {editingProduct ? "Save Changes" : "Add Product"}
  </button>

</form>
    </div>
  </div>
)}
    </section>
  )
}

export default Products
