import { AppSidebar } from "./sidebar";
import { Outlet } from "react-router-dom";
import Avatar from "./avatar";
// import Navbar from "@/components/Navbar";

const Layout = () => {
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center bg-gray-800">
        {/* sidebar */}
        <div className="w-[20%] flex-wrap h-full bg-gray-800">
          <Avatar />
          <AppSidebar />
        </div>
        {/* main
         */}
        <div className="w-[80%] h-[95%] flex-wrap bg-black rounded-[0.5rem] m-6 p-2">
          {/* <Navbar /> */}
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Layout;
