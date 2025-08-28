import { useState, useEffect } from "react";
import { BarChart } from "@/components/charts/BarChart";
import { ClipboardPlus, FileUp, Group, Plus } from "lucide-react";
import type { ChartData } from "chart.js";
import { api } from "@/lib/api";
import type { MonthlyGroupItem, NormalExpanse } from "@/type";
import { getMonthlyDataReport } from "@/lib/getMonthlyDataReport";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [loading, SetLoading] = useState(true);
  const [data, setData] = useState<NormalExpanse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/expense/get-single-expense`);
        setData(res.data?.expanse);
        SetLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const pageData = [
    { id: 1, name: "Add Expense", icon: Plus, url: "/expense" },
    { id: 2, name: "Create report", icon: ClipboardPlus, url: "/report" },
    { id: 3, name: "Export", icon: FileUp, url: "/report" },
    { id: 4, name: "Create group", icon: Group, url: "/groups" },
  ];

  const monthlyReport: MonthlyGroupItem[] = data?.length
    ? getMonthlyDataReport(data)
    : [];

  const chart: ChartData<"bar", number[], unknown> = {
    labels: monthlyReport.map((item) => `${item.category}`),
    datasets: [
      {
        label: "Amount",
        data: monthlyReport.map((Item) => Item.totalAmount),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      localStorage.removeItem("authToken");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="w-full flex flex-col flex-1 space-y-5">
      <nav className="w-full h-14 bg-gray-800 px-4 ">
        <div className="h-full max-w-screen-xl flex flex-wrap justify-between items-center mx-auto gap-2">
          <h1 className="font-serif font-semibold">Home</h1>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </nav>
      <div className="w-full max-h-screen font-serif bg-gray-800 rounded-sm">
        <p className="border-b border-gray-600 font-semibold p-2 text-white">
          Quick Access
        </p>

        <ul className="h-[4rem] flex flex-row justify-evenly items-center p-4">
          {pageData.map((items) => (
            <li
              key={items.id}
              className="w-2/12 h-full flex items-center justify-center bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition cursor-pointer gap-3"
              onClick={() => navigate(items.url)}
            >
              {items.icon && <items.icon size={18} />}
              {items.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full font-serif bg-gray-800 rounded-sm">
        <p className="border-b border-gray-600 font-semibold p-2 text-white">
          Total Expenses
        </p>
        <div className="flex justify-evenly items-center p-4 gap-4">
          <div className="w-full h-full">
            {loading ? <p>loading...</p> : <BarChart data={chart} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
