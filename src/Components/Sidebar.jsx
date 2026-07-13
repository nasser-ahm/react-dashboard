import { menuLinks } from "../data/Menulinks"
import { Link } from "react-router-dom"
import { LogOut } from "lucide-react"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"

function Sidebar({osb}) {

  async function handleLogout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className={`fixed left-0 top-0 bottom-0 z-50 ${osb ? "w-[300px]" : "w-[0px]"} flex flex-col justify-between transition-all duration-300 bg-blue-900 overflow-hidden border-r`}>
      <div className="flex flex-col ">
      <div className="flex items-center justify-center py-6 shrink-0 whitespace-nowrap mb-20">
      <h3 className="text-2xl text-red-600 font-bold">Nazz <span className="text-white">Code</span></h3>
      </div>
      <ul className="px-2">
        {menuLinks.map(link => (
          <li key={link.id} className="p-2 font-medium text-white hover:bg-blue-200"><Link to={link.path} className="flex gap-2  "><link.icon/>{link.name}</Link></li>
        ))}
      </ul>
      <ul className="mt-60 px-2">
        <li>
          <div className="flex items-center py-2 px-3 gap-2 hover:text-red-200 transition-all duration-300">
          <LogOut className="text-red-700 cursor-pointer"/>
          <button className="text-red-700  text-2xl cursor-pointer" onClick={handleLogout}>log-out</button>
          </div>
          </li>
      </ul>
      </div>
    </div>
  )
}

export default Sidebar
