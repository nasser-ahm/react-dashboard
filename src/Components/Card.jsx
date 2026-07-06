


const Card = ({ title, value, trend, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center">
        <h3>{title}</h3>
        {icon}
      </div>

      <h2 className="text-3xl font-bold mt-4">{value}</h2>

      <p className="text-green-500 mt-2">{trend}</p>
    </div>
  );
};

export default Card;
