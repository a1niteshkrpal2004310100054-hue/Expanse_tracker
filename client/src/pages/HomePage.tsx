import { useState, useEffect } from "react";
import { BarChart } from "@/components/charts/BarChart";
import { api } from "@/lib/api";
import type { NormalExpanse } from "@/type";

const HomePage = () => {
  const [loading, SetLoading] = useState(true);
  const [data, setData] = useState<NormalExpanse[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/expense/get-single-expense`);
        setData(res.data.expanse);
        SetLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  // const categoryMap = {};
  // for (const items of data) {
  //   const { category, amount } = items;
  //   if (categoryMap[category]) {
  //     categoryMap[category] += amount;
  //   } else {
  //     categoryMap[category] = amount;
  //   }
  // }
  // const final = Object.entries(categoryMap).map(([category, amount]) => ({
  //   category,
  //   amount,
  // }));

  // console.log(final);

  // const month = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "June",
  //   "July",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // const monthlyGrouped = {};

  // data.forEach((expense) => {
  //   const date = new Date(expense.createdAt);
  //   const getMonth = month[date.getMonth()];
  //   const category = expense.category;
  //   const key = `${getMonth}-${category}`;

  //   if (!monthlyGrouped[key]) {
  //     monthlyGrouped[key] = {
  //       getMonth,
  //       category,
  //       totalAmount: 0,
  //     };
  //   }

  //   monthlyGrouped[key].totalAmount += expense.amount;
  // });
  // const result = Object.values(monthlyGrouped);

  console.log(result);
  return (
    <section className="w-full h-full space-y-5">
      <div className="w-full max-h-screen font-serif bg-gray-800 rounded-sm">
        <p className="border-b border-gray-600 font-semibold p-2 text-white">
          Quick Access
        </p>
        <ul className="h-[4rem] flex justify-evenly items-center p-4">
          <li className="w-2/12 h-full flex items-center justify-center bg-gray-700 text-white rounded hover:bg-gray-600 transition cursor-pointer">
            List 1
          </li>
        </ul>
      </div>
      <div className="w-full font-serif bg-gray-800 rounded-sm">
        <p className="border-b border-gray-600 font-semibold p-2 text-white">
          Monthly report
        </p>
        <div className="h-[20rem] flex justify-evenly items-center p-4 gap-4">
          {/* <div className="w-full flex flex-col items-center justify-center flex-1 h-full">
            <div className="w-full max-w-xs h-full">
              
            </div>
          </div> */}
          {loading ? <p>loading...</p> : <BarChart />}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

{
  /* <div className="flex flex-col items-center justify-center flex-1 h-full">
            <h2 className="text-white text-lg mb-2 text-center font-semibold">
              Monthly Data Overview
            </h2>
            <div className="w-full max-w-xs h-full">
              <DoughnutChart data={data} />
            </div>
          </div> */
}
