'use client';

import { Logout } from "@/helpers";
import { BookOpenCheck, ChartBarIncreasing, CopyMinus, LogOut, Menu } from "lucide-react"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"





export const SideBar = () => {

  const [isOpen, setIsOpen] = useState(true)
  const pathName = usePathname();

  const router = useRouter();



  return (
    <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${ isOpen ? "w-64" : "w-20" }`}>
        <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">

          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer">
            <Menu size={24} />
          </button>

          <nav className="mt-8 flex flex-col h-full">
            
              <div className="flex-grow-3">

                    <Link key={"categories"} href={ "/categories" }>
                        <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${ pathName === "/categories" ? "bg-[#2f2f2f]" : "" } `}>
                            <ChartBarIncreasing size={20} style={{minWidth: "20px"}} />
                            <span className={`ml-4 whitespace-nowrap transition-all duration-300 overflow-hidden ${ isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0' }`} >{ "categories" }</span>
                        </div>
                    </Link>
                    <Link key={"tasks"} href={ "tasks" }>
                        <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${ pathName === "/tasks" ? "bg-[#2f2f2f]" : "" } `}>
                            <BookOpenCheck size={20} style={{minWidth: "20px"}} />
                            <span className={`ml-4 whitespace-nowrap transition-all duration-300 overflow-hidden ${ isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0' }`} >{ "Tasks" }</span>
                        </div>
                    </Link>
                    <Link key={"Subtasks"} href={ "/subtasks" }>
                        <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${ pathName === "/subtasks" ? "bg-[#2f2f2f]" : "" } `}>
                            <CopyMinus size={20} style={{minWidth: "20px"}} />
                            <span className={`ml-4 whitespace-nowrap transition-all duration-300 overflow-hidden ${ isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0' }`} >{ "Subtasks" }</span>
                        </div>
                    </Link>
              </div>
              <div className="mt-auto">
                <button key={"Logout"} onClick={()=> Logout(router)}>
                        <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${ pathName === "/logout" ? "bg-[#2f2f2f]" : "" } `}>
                            <LogOut size={20} style={{minWidth: "20px"}} />
                            <span className={`ml-4 whitespace-nowrap transition-all duration-300 overflow-hidden ${ isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0' }`} >{ "Logout" }</span>
                        </div>
                    </button>
              </div>
                
          </nav>
        </div>
    </div>
  )
}
