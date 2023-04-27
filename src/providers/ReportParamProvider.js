// ReportParamProvider.js
import { useState, useEffect } from "react";
import ReportParamContext from "../contexts/ReportParamContext";

export const ReportParamProvider = ({ children }) => {
  const [questname, setQuestname] = useState("");
  const [runs, setRuns] = useState(0);
  const [lines, setLines] = useState([]);
  const [note, setNote] = useState("");

  return (
    <ReportParamContext.Provider
      value={{
        questname,
        setQuestname,
        runs,
        setRuns,
        lines,
        setLines,
        note,
        setNote,
      }}
    >
      {children}
    </ReportParamContext.Provider>
  );
};
