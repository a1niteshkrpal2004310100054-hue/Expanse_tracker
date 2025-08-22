import { Home, Calculator, Group, ReceiptIndianRupee } from "lucide-react";

const navItems = [
  {
    name: "Home",
    url: "/home",
    icon: Home,
  },
  {
    name: "Expanses",
    url: "/expense",
    icon: ReceiptIndianRupee,
  },
  {
    name: "Groups",
    url: "/groups",
    icon: Group,
  },
  {
    name: "Budget",
    url: "#",
    icon: Calculator,
  },
];

export function AppSidebar() {
  return (
    <div className="w-full max-w-xs mx-auto space-y-2">
      {navItems.map((item, index) => (
        <div key={index}>
          <a
            href={item.url}
            className="flex items-center gap-4 px-6 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            {item.icon && <item.icon className="w-5 h-5 text-gray-300" />}
            <span className="text-md font-medium">{item.name}</span>
          </a>
        </div>
      ))}
    </div>
  );
}
