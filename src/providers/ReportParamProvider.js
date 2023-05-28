// ReportParamProvider.js
import { useState } from "react";
import ReportParamContext from "../contexts/ReportParamContext";

export const ReportParamProvider = ({ children }) => {
  const [questname, setQuestname] = useState("");
  const [runs, setRuns] = useState(0);
  const [lines, setLines] = useState([]);
  const [note, setNote] = useState("");
  const [reportText, setReportText] = useState("");
  const [isReportButtonEnabled, setIsReportButtonEnabled] = useState(false);
  const [isTweetButtonEnabled, setIsTweetButtonEnabled] = useState(false);

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
        reportText,
        setReportText,
        isReportButtonEnabled,
        setIsReportButtonEnabled,
        isTweetButtonEnabled,
        setIsTweetButtonEnabled,
      }}
    >
      {children}
    </ReportParamContext.Provider>
  );
};
