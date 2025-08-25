import type { NormalExpanse } from "@/type/index";
import type { MonthlyGroup } from "@/type/index";

export function getMonthlyDataReport(expenses: NormalExpanse[]) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyGrouped: MonthlyGroup = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.createdAt);
    const getMonth = month[date.getMonth()];
    const category = expense.category;
    const key = `${getMonth}-${category}`;
    if (!monthlyGrouped[key]) {
      monthlyGrouped[key] = {
        getMonth,
        category,
        totalAmount: 0,
      };
    }
    monthlyGrouped[key].totalAmount += expense.amount;
  });
  const result = Object.values(monthlyGrouped);
  return Object.values(result);
}
