import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center  h-14 bg-gray-800 mx-auto">
      <div className="w-full flex justify-between items-center mx-5">
        <h1>Expanse Tracker</h1>
        <div className="w-[20%] flex flex-wrap justify-around items-center gap-2">
          <Button>Login</Button>
          <Button>Logout</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
