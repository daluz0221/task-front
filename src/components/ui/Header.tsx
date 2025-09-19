"use client"
import Image from "next/image"
import colombiaFlat from '../../../public/colombia.webp';

import { Bell } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";



export const Header = () => {

  const user = useAuthStore(state => state.user)
  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
        <div className="mx-x-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
            <Link href={'/'} >
              Dashboard
            </Link>
          </h1>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <Image 
              src={colombiaFlat}
              alt="country flat"
              width={35}
              height={28}
              className="rounded-full shadow-md cursor-pointer"
            />
            <div className="relative">
              <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white" />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* <Image 
                src={admin}
                alt='admin'
                width={45}
                height={45}
                className="rounded-full border border-gray-600"
              /> */}

              <span className="hidden sm:block text-gray-100 font-medium">{ user?.first_name ? user?.first_name : user?.username }</span>
            </div>
          </div>
        </div>
    </header>
  )
}
