import Card from "../Components/Card"
import { Users, DollarSign, ShoppingBag, } from "lucide-react";
import RevenueChart from "../Components/RevenueChart";
import CategoryChart from "../Components/PieChart";



function Dashboard({osb}) {
  return (
    <section className={`min-h-screen ${osb ? "md:ml-[300px]" : "md:ml-[0px]"} transition-all duration-300 `}>
      <div className=" rounded-xl  m-4 min-h-screen bg-white shadow p-4">
         <div className="grid grid-cols-3 gap-6">
      <Card
        title="Revenue"
        value="$24,500"
        trend="+12%"
        icon={<DollarSign />}
      />

      <Card
        title="Users"
        value="1,245"
        trend="+8%"
        icon={<Users />}
      />

      <Card
        title="Orders"
        value="342"
        trend="+5%"
        icon={<ShoppingBag />}
      />
    </div>
    <RevenueChart/>
      <CategoryChart/>
    </div>
    </section>
  )
}

export default Dashboard
