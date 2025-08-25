import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SingleExpense } from "@/components/createSingleExpanse";
import Expansetable from "@/components/expansetable";
import { api } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setExpanse } from "@/redux/singleSlice";
import type { RootState } from "@/redux/store";

const Expense = () => {
  const dispatch = useDispatch();

  const [loading, SetLoading] = useState<boolean>(true);
  const data = useSelector((state: RootState) => state.single.expenses);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/expense/get-single-expense`);
        dispatch(setExpanse(res.data.expanse));
        // setData(res.data.expanse);
        SetLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [dispatch]);

  const handleDelete = () => {};

  return (
    <>
      <section>
        <nav className="w-full h-14 bg-gray-800 px-4">
          <div className="h-full max-w-screen-xl flex flex-wrap justify-between items-center mx-auto gap-2">
            <h1>Expanse Tracker</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
              </Button>
              <Button size="sm" onClick={() => setOpen(!open)}>
                Create
              </Button>
              <SingleExpense
                name={"Create Expanse"}
                mode={"create"}
                open={open}
                onOpenChange={setOpen}
              />
            </div>
          </div>
        </nav>
        <div className="flex flex-1 ">
          {loading ? <p>loading...</p> : <Expansetable data={data} />}
        </div>
      </section>
    </>
  );
};

export default Expense;
