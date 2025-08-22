import { Button } from "@/components/ui/button";
import Create from "@/components/createExpense";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { addGroups } from "@/redux/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { Checkbox } from "@/components/ui/checkbox";

const Groups = () => {
  const groupData = useSelector((state: RootState) => state.group.groupData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, SetLoading] = useState<boolean>(true);

  const [select, setSelect] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/expense/get-group`);
        dispatch(addGroups(res.data.allGroups));
        SetLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Loading failed");
      }
    };

    fetch();
  }, [dispatch]);

  if (loading) {
    return <p>loading..</p>;
  }

  const handleCheckboxChange = async (
    checked: string | boolean,
    group: string | null
  ) => {
    if (checked) {
      setSelect(group);
    } else {
      setSelect(null);
    }
  };

  console.log(select);
  return (
    <>
      <section>
        <nav className="w-full h-14 bg-gray-800 px-4 ">
          <div className="h-full max-w-screen-xl flex flex-wrap justify-between items-center mx-auto gap-2">
            <h1>Groups</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="destructive" size="sm">
                Delete
              </Button>
              <Create />
            </div>
          </div>
        </nav>
        <main className="max-w-[900px] space-y-5 mt-5 mx-auto px-4">
          {groupData?.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-row justify-between items-center gap-10"
            >
              <Checkbox
                checked={select === item._id}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(checked, item._id)
                }
              />
              <div
                className="w-full h-16 bg-gray-700 rounded-[0.5rem] flex items-center justify-between px-4 capitalize"
                onClick={() => navigate(`/groups-expenses/${item._id}`)}
              >
                {item.title}
                <ChevronRight />
              </div>
            </div>
          ))}
        </main>
      </section>
    </>
  );
};

export default Groups;
