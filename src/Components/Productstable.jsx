import { Edit, Trash2 } from "lucide-react"

function Productstable({products, onDelete, onEdit}) {
  return (
    <div className="mt-20">
        <div className="mt-8 overflow-x-auto rounded-lg border">

      <table className="w-full border-collapse">
  <thead>
    <tr className="border-b">
      <th className="p-4 text-left">Image</th>
      <th className="p-4 text-left">Name</th>
      <th className="p-4 text-left">Category</th>
      <th className="p-4 text-left">Price</th>
      <th className="p-4 text-left">Stock</th>
      <th className="p-4 text-left">Status</th>
      <th className="p-4 text-left">Actions</th>
    </tr>
  </thead>

  <tbody>
    {products.map((product) => (
      <tr key={product.id} className="border-b hover:bg-gray-50">
        <td className="p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-14 h-14 rounded object-cover"
             onError={(e) => {
                e.target.src = "https://placehold.co/56x56?text=No+Image";
              }}
          />
        </td>

        <td className="p-4">{product.title}</td>

        <td className="p-4">{product.category}</td>

        <td className="p-4">${product.price}</td>

        <td className="p-4">{product.stock}</td>

       <td className="p-4">
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      product.stock > 20
        ? "bg-green-100 text-green-700"
        : product.stock > 5
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {product.stock > 20
      ? "In Stock"
      : product.stock > 5
      ? "Low Stock"
      : "Out of Stock"}
  </span>
</td>

       <td className="p-4">
  <div className="flex items-center gap-2">
    <button className="rounded p-2 hover:bg-blue-100 transition">
      <Edit size={18}  onClick={() => onEdit(product)}/>
    </button>

    <button className="rounded p-2 hover:bg-red-100 transition">
      <Trash2 size={18}  onClick={() => onDelete(product.id)}/>
    </button>
  </div>
</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
    </div>
  )
}

export default Productstable
