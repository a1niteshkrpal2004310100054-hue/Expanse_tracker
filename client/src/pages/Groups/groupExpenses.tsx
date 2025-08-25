import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CreateGroupExpanse from "./createGroupExpanse";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGroup, getGroupExpanse } from "@/redux/groupSlice";
import { api } from "@/lib/api";
import type { RootState } from "@/redux/store";
import { DoughnutChart } from "@/components/charts/DonutChart";

type Routeparams = {
  groupId: string;
};

function GroupExpenses() {
  const { groupId } = useParams<Routeparams>();
  const dispatch = useDispatch();
  const groupExpanse = useSelector(
    (state: RootState) => state.group.groupExpanse
  );

  const totalAmount = useSelector((state: RootState) =>
    state.group.groupExpanse.reduce((acc, item) => acc + item.amount, 0)
  );

  console.log(totalAmount);

  useEffect(() => {
    if (!groupId) return;

    dispatch(filterGroup(groupId));

    const fetch = async () => {
      try {
        const res = await api.get(`/expense/get-group-expanse/${groupId}`);
        console.log(res.data);
        dispatch(getGroupExpanse(res.data?.expensepopulated));
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [groupId, dispatch]);

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
              {groupExpanse.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-700 text-white rounded-md p-2"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-300 capitalize">
                      Paid by: {item.paidBy?.name}
                    </p>
                  </div>
                  <span className="text-lg font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-2">
            <div className="flex-1 bg-gray-800 p-6">
              {/* <DoughnutChart /> */}
            </div>
            {/* <div className="flex-1 bg-gray-800">
              <DoughnutChart />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default GroupExpenses;
