import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CreateGroupExpanse from "./createGroupExpanse";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroupExpense,
  filterGroup,
  getGroupExpanse,
} from "@/redux/groupSlice";
import { api } from "@/lib/api";
import type { RootState } from "@/redux/store";
import { DoughnutChart } from "@/components/charts/DonutChart";
import type { Expanse } from "@/type";
import type { ChartData } from "chart.js";
import { useUser } from "@/context/AuthContext";
import { Trash } from "lucide-react";
import type { Routeparams, ViewInput, Participents } from "@/type/group";
import toast from "react-hot-toast";

function GroupExpenses() {
  const { groupId } = useParams<Routeparams>();
  const dispatch = useDispatch();
  const groupExpanse = useSelector(
    (state: RootState) => state.group.groupExpanse
  );
  const [mount, setMount] = useState<boolean>(false);
  const [viewData, setViewData] = useState<ViewInput[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (!groupId) return;

    dispatch(filterGroup(groupId));

    const fetch = async () => {
      try {
        const res = await api.get(`/expense/get-group-expanse/${groupId}`);
        // console.log(res.data);
        dispatch(getGroupExpanse(res.data?.expensepopulated));
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [groupId, dispatch]);

  const totalAmount = useSelector((state: RootState) =>
    state.group.groupExpanse.reduce((acc, item) => acc + item.amount, 0)
  );

  const userId = user?._id;
  const amountPaidByCurrentUser = groupExpanse.reduce((total, expense) => {
    const paidParticipents = expense.participents.find(
      (p) => p._id === expense.paidBy?._id
    );
    if (paidParticipents?.linkedUserId === userId) {
      return total + expense.amount;
    }
    return total;
  }, 0);

  console.log("Expenses paid by user:", amountPaidByCurrentUser, totalAmount);

  const chartdata: ChartData<"doughnut", number[], unknown> = {
    labels: [
      `Total Amount ${totalAmount}`,
      `Paid by you ${amountPaidByCurrentUser}`,
    ],
    datasets: [
      {
        label: "Amount",
        data: [totalAmount, amountPaidByCurrentUser],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      },
    ],
  };

  const mountIndividualComponent = (items: Expanse) => {
    setMount((prev) => !prev);
    const { _id, name } = items.paidBy;
    const paidBy = { name, _id };
    const totalAmount = items.amount;
    const title = items.title;
    const participents: Participents[] = items.participents
      .filter((p) => p._id !== null)
      .map((p) => ({
        name: p.name,
        id: p.linkedUserId as string,
      }));
    const amount =
      participents.length > 0 ? totalAmount / participents.length : 0;

    const newEntry: ViewInput = {
      title,
      paidBy,
      totalAmount,
      participents,
      amount,
    };

    setViewData([newEntry]);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const res = await api.delete("/expense/delete-group-expanse", {
        data: {
          expenseId: id,
        },
      });
      dispatch(deleteGroupExpense(id));
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="w-full h-full flex flex-col">
        <nav className="w-full h-14 bg-gray-800 px-4">
          <div className="h-full max-w-screen-xl flex flex-wrap justify-between items-center mx-auto">
            {/* comes from the selected Group */}
            <h1>Groups Name</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Link to={"/groups"}>
                <Button variant="destructive" size="sm">
                  Back
                </Button>
              </Link>
              <CreateGroupExpanse />
            </div>
          </div>
        </nav>
        <div className="w-full flex flex-1 flex-row mx-auto gap-2 mt-5 relative">
          <div className="w-1/2 flex justify-center bg-gray-800">
            <div className="w-[98%] max-h-[500px] overflow-y-auto flex flex-col gap-2 rounded-xl mt-1">
              {groupExpanse.map((items, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-700 text-white rounded-md p-2"
                  onClick={() => mountIndividualComponent(items)}
                >
                  <div>
                    <h2 className="text-lg font-semibold">{items.title}</h2>
                    <p className="text-sm text-gray-300 capitalize">
                      Paid by: {items.paidBy?.name}
                    </p>
                  </div>
                  <div>
                    <Trash
                      size={18}
                      onClick={() => handleDelete(items._id)}
                      className="text-red-300"
                    />

                    <span className="text-lg font-medium">{items.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-2">
            <div className="flex-1 bg-gray-800">
              {mount ? (
                viewData.map((items, index) => (
                  <article key={index} className="m-2">
                    <header>
                      <h2 className="p-0.5 text-center font-medium">
                        {items.title}
                      </h2>
                    </header>
                    <section className="mx-4 space-y-1">
                      <p>PaidBy</p>
                      <ul className="bg-gray-700 rounded-xl">
                        <li className="flex felx-row justify-around items-center py-1">
                          <span className="capitalize">
                            {items.paidBy.name}
                          </span>
                          {items.totalAmount}
                        </li>
                      </ul>
                    </section>
                    <section className="mx-4 space-y-1">
                      <p>Participents</p>
                      <ul className="bg-gray-700 rounded-xl">
                        {items.participents.map((item) => (
                          <li
                            key={item.name}
                            className="flex felx-row justify-around items-center border-b last:border-b-0 border-gray-600 py-1"
                          >
                            <span className="capitalize">{item.name}</span>
                            {items.amount.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </article>
                ))
              ) : (
                <p className="h-full flex justify-center items-center">
                  Click on any expanse list
                </p>
              )}
            </div>
            <div className="flex-1 bg-gray-800 py-4">
              <DoughnutChart data={chartdata} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GroupExpenses;
