import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/HomePage";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Logout from "./pages/logout";
import { ProtectedRoutes } from "./lib/protectedRoute";
import Expense from "./pages/Expanse/Expense";
import Groups from "@/pages/Groups";
import GroupExpenses from "./pages/Groups/groupExpenses";

const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route>
            <Route path="/home" element={<HomePage />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/groups" element={<Groups />} />
            <Route
              path="/groups-expenses/:groupId"
              element={<GroupExpenses />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
