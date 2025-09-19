import { Header, Protected } from "@/components";
import { SideBar } from "@/components";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Protected>

    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-auto"> 
      <div className="max-w-7xl mx-auto w-full">

        <Header />
        <main className="pl-4 sm:pl-6 lg:pl-0 h-[calc(100vh-30%)]">
          {children}
        </main>
      </div>
      </div>
    </div>

    </Protected>
  );
}
