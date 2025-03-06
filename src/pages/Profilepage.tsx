import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hook";
import { fetchEmployeeFromId } from "../utils";
import EmployeeCard from "../components/EmployeeCard";
import { useNavigate } from "react-router";

function Profilepage() {
  const { user } = useAppSelector((state) => state.auth);
  const [data, setData] = useState<EmployeeWithId | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      setLoading(true);

      const data = await fetchEmployeeFromId(user.id);

      setLoading(false);
      setData(data);
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return <div>{data && <EmployeeCard employee={data} />}</div>;
}

export default Profilepage;
