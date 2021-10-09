import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import { AuthCOntext } from "../auth/auth.service";

export const RecordContext = createContext({});

const RecordProvider = (props) => {
  const [records, setRecords] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthCOntext);

  const updateRecord = (id, newRecord) => {
    const idx = records.findIndex((el) => el.id === id);
    const oldRecs = [...records];
    oldRecs.splice(idx, 1, newRecord);
    setRecords(oldRecs);
  };

  const fetchRecords = useCallback(async () => {
    try {
      setIsFetching(true);
      const {
        data: { data },
      } = await axios({
        method: "get",
        url: "https://powerful-stream-15446.herokuapp.com/api/view-employees",
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setIsFetching(false);
      setRecords(data);
    } catch (e) {
      setError(e.response);
      setIsFetching(false);
    }
  }, [user]);

  useEffect(() => {
    const getRecords = async () => {
      await fetchRecords();
    };
    getRecords();
  }, [fetchRecords]);

  return (
    <RecordContext.Provider
      value={{ records, isFetching, error, updateRecord }}
    >
      {props.children}
    </RecordContext.Provider>
  );
};

export default RecordProvider;
