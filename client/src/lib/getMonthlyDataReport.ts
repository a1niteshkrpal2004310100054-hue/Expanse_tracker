import { formatDate } from "./date";

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

function getMonthlyDataReport(expenses) {
  const monthlyReport = {};

  for (let items of expenses) {
    const date = new Date(items.createdAt);
    const getMonth = month[date.getMonth()]
    const category = items.category;

    if(!monthlyReport[getMonth]) 
  }
}
