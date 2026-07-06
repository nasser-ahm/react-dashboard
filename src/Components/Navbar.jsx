import { PanelLeftClose } from "lucide-react"
import { Bell, MessageCircle, Moon, User } from "lucide-react"




function Navbar({osb, sosb}) {
  return (
    <nav className={`flex items-center justify-between p-4 border-b ${osb ? "ml-[300px]" : "ml-[0px]"} transition-all duration-300 bg-blue-900`}>
  <div className="flex items-center gap-4">
    <PanelLeftClose className="cursor-pointer text-white" onClick={() => {sosb(!osb)}}/>
    <input
      type="text"
      placeholder="Search..."
      className="border px-3 py-2 rounded bg-white outline-none"
    />
  </div>

  <div className="flex items-center gap-4 text-white cursor-pointer">
    <Bell />
    <MessageCircle />
    <Moon />
    <User />
  </div>
</nav>
  )
}

export default Navbar
